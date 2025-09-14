import { INTERACTIVE_BACKGROUND_CONFIG as CONFIG } from '@/const';
import type { Point, Node, Line } from '@/models';

/**
 * Creates a grid of nodes covering the screen
 */
export class NodeService {
  static createGrid(width: number, height: number): Node[] {
    const nodes: Node[] = [];
    let id = 0;

    for (let x = 0; x <= width; x += CONFIG.NODE_SPACING) {
      for (let y = 0; y <= height; y += CONFIG.NODE_SPACING) {
        nodes.push({ x, y, id: id++ });
      }
    }

    return nodes;
  }
}

/**
 * Creates connections between nearby nodes
 */
export class LineService {
  static createConnections(nodes: Node[]): Line[] {
    const lines: Line[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = this.getDistance(nodes[i], nodes[j]);

        if (distance <= CONFIG.MAX_CONNECTION_DISTANCE) {
          lines.push({
            start: nodes[i],
            end: nodes[j],
            distance
          });
        }
      }
    }

    return lines;
  }

  private static getDistance(node1: Node, node2: Node): number {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

/**
 * Handles coordinate transformations and distance calculations
 */
export class GeometryService {
  static getDistanceToLine(line: Line, point: Point): number {
    const { start, end } = line;
    const A = point.x - start.x;
    const B = point.y - start.y;
    const C = end.x - start.x;
    const D = end.y - start.y;

    const dot = A * C + B * D;
    const lenSq = C * C + D * D;
    let param = -1;

    if (lenSq !== 0) {
      param = dot / lenSq;
    }

    let xx: number, yy: number;

    if (param < 0) {
      xx = start.x;
      yy = start.y;
    } else if (param > 1) {
      xx = end.x;
      yy = end.y;
    } else {
      xx = start.x + param * C;
      yy = start.y + param * D;
    }

    const dx = point.x - xx;
    const dy = point.y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  }

  static getDistance(point1: Point, point2: Point): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

/**
 * Handles the gravitational physics calculations
 */
export class PhysicsService {
  static calculateDisplacement(point: Node | Point, mousePoint: Point, distance: number): { x: number; y: number } {
    if (distance === 0) return { x: 0, y: 0 };

    const isMobile = window.innerWidth < CONFIG.MOBILE_BREAKPOINT;
    const G = isMobile ? CONFIG.GRAVITY_MOBILE : CONFIG.GRAVITY_DESKTOP;
    const maxDisplacement = isMobile ? CONFIG.MAX_DISPLACEMENT_MOBILE : CONFIG.MAX_DISPLACEMENT_DESKTOP;

    // Direction vector from point to mouse
    const dx = mousePoint.x - point.x;
    const dy = mousePoint.y - point.y;

    // Normalize
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return { x: 0, y: 0 };

    const normalizedDx = dx / length;
    const normalizedDy = dy / length;

    // Gravitational force (repulsion)
    const force = G / (distance * distance + 1);
    const displacement = Math.min(force * 50, maxDisplacement);

    // REPULSION: move away from mouse
    return {
      x: -normalizedDx * displacement,
      y: -normalizedDy * displacement
    };
  }
}

/**
 * Handles canvas rendering operations
 */
export class RenderService {
  private ctx: CanvasRenderingContext2D;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  render(lines: Line[], mousePoint: Point | null, isActive: boolean): void {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (!isActive || !mousePoint) return;

    const influenceRadius = CONFIG.NODE_SPACING * CONFIG.INFLUENCE_RADIUS_MULTIPLIER;

    lines.forEach((line) => {
      const distanceToPoint = GeometryService.getDistanceToLine(line, mousePoint);

      // Performance optimization
      if (distanceToPoint > influenceRadius * CONFIG.CULL_MULTIPLIER) return;

      const influence = Math.max(0, 1 - (distanceToPoint / influenceRadius));

      if (influence > CONFIG.PERFORMANCE_THRESHOLD_LINE) {
        this.renderLine(line, influence, mousePoint);
        this.renderNodes(line, mousePoint, influence);
      }
    });
  }

  private renderLine(line: Line, influence: number, mousePoint: Point): void {
    const alpha = influence * CONFIG.LINE_OPACITY;
    if (alpha < 0.01) return;

    // Calculate displacements
    const startDisplacement = PhysicsService.calculateDisplacement(
      line.start, mousePoint, GeometryService.getDistance(line.start, mousePoint)
    );
    const endDisplacement = PhysicsService.calculateDisplacement(
      line.end, mousePoint, GeometryService.getDistance(line.end, mousePoint)
    );

    const startX = line.start.x + startDisplacement.x;
    const startY = line.start.y + startDisplacement.y;
    const endX = line.end.x + endDisplacement.x;
    const endY = line.end.y + endDisplacement.y;

    // Bézier curve control point
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    const controlPoint = { x: midX, y: midY };
    const distanceToControl = GeometryService.getDistance(controlPoint, mousePoint);
    const controlDisplacement = PhysicsService.calculateDisplacement(
      controlPoint, mousePoint, distanceToControl
    );

    const isMobile = window.innerWidth < CONFIG.MOBILE_BREAKPOINT;
    const curveIntensity = isMobile ? CONFIG.CURVE_INTENSITY_MOBILE : CONFIG.CURVE_INTENSITY_DESKTOP;
    const controlX = midX + (controlDisplacement.x * curveIntensity);
    const controlY = midY + (controlDisplacement.y * curveIntensity);

    // Draw curved line
    this.ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
    this.ctx.lineWidth = CONFIG.LINE_WIDTH;
    this.ctx.lineCap = 'round';

    this.ctx.beginPath();
    this.ctx.moveTo(startX, startY);
    this.ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    this.ctx.stroke();
  }

  private renderNodes(line: Line, mousePoint: Point, influence: number): void {
    [line.start, line.end].forEach((node) => {
      const nodeDistance = GeometryService.getDistance(node, mousePoint);
      const canvasDiagonal = Math.sqrt(
        this.ctx.canvas.width * this.ctx.canvas.width +
        this.ctx.canvas.height * this.ctx.canvas.height
      );
      const maxNodeDistance = canvasDiagonal;

      const nodeInfluence = Math.max(0, 1 - (nodeDistance / maxNodeDistance));

      if (nodeInfluence > CONFIG.PERFORMANCE_THRESHOLD_NODE) {
        const nodeAlpha = nodeInfluence * CONFIG.NODE_OPACITY;
        if (nodeAlpha < 0.005) return;

        const gravitationalPull = PhysicsService.calculateDisplacement(node, mousePoint, nodeDistance);

        this.ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha})`;
        this.ctx.beginPath();
        this.ctx.arc(
          node.x + gravitationalPull.x,
          node.y + gravitationalPull.y,
          CONFIG.NODE_RADIUS,
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    });
  }
}