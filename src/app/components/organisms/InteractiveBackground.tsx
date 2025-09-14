import React, { useEffect, useRef, useState, useCallback } from 'react';

// Domain entities following Single Responsibility Principle
interface Node {
  x: number;
  y: number;
  id: number;
}

interface Line {
  start: Node;
  end: Node;
  distance: number;
}

interface Point {
  x: number;
  y: number;
}

interface InteractionState {
  isActive: boolean;
  currentPoint: Point | null;
  isMouseDown: boolean;
}

// Services following SOLID principles
class NodeGenerator {
  static generateGrid(width: number, height: number, spacing: number = 100): Node[] {
    const nodes: Node[] = [];
    let id = 0;

    // Generate fewer nodes for better performance, but still cover the screen
    for (let x = 0; x <= width; x += spacing) {
      for (let y = 0; y <= height; y += spacing) {
        nodes.push({ x, y, id: id++ });
      }
    }

    return nodes;
  }
}

class LineGenerator {
  static generateConnections(nodes: Node[], maxDistance: number = 120): Line[] {
    const lines: Line[] = [];

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const distance = this.calculateDistance(nodes[i], nodes[j]);

        if (distance <= maxDistance) {
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

  private static calculateDistance(node1: Node, node2: Node): number {
    const dx = node1.x - node2.x;
    const dy = node1.y - node2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class GeometryUtils {
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

  static getDistanceBetweenPoints(point1: Point, point2: Point): number {
    const dx = point1.x - point2.x;
    const dy = point1.y - point2.y;
    return Math.sqrt(dx * dx + dy * dy);
  }
}

class CanvasRenderer {
  private ctx: CanvasRenderingContext2D;
  private time: number = 0;

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }

  render(lines: Line[], interactionPoint: Point | null, isActive: boolean): void {
    // Clear canvas
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    if (!isActive || !interactionPoint) {
      return;
    }

    const canvasWidth = this.ctx.canvas.width;
    const canvasHeight = this.ctx.canvas.height;
    const maxDistance = Math.sqrt(canvasWidth * canvasWidth + canvasHeight * canvasHeight);

    // Expanded influence radius: cover much more area like before for better visibility
    const nodeSpacing = 100; // Based on NodeGenerator.generateGrid spacing
    const influenceRadius = nodeSpacing * 4.5; // ~450px radius covers ~60+ nodes for expansive effect

    lines.forEach((line) => {
      const distanceToPoint = GeometryUtils.getDistanceToLine(line, interactionPoint);

      // Only skip lines that are way too far (for performance) - adjusted for node-based radius
      if (distanceToPoint > influenceRadius * 1.5) return;

      // Global influence: all lines within radius are affected
      const influence = Math.max(0, 1 - (distanceToPoint / influenceRadius));

      if (influence > 0.001) { // Very low threshold for global effect
        this.renderLine(line, influence, interactionPoint);
        this.renderNodes(line, interactionPoint, influence);
      }
    });
  }

  private renderLine(line: Line, influence: number, interactionPoint: Point): void {
    // High visibility opacity for strong repulsion effect
    const alpha = influence * 0.35; // Much more visible for dramatic effect

    if (alpha < 0.01) return; // Lower threshold for debugging

    // Calculate gravitational displacement for both endpoints
    const startDisplacement = this.calculateGravitationalDisplacement(line.start, interactionPoint,
      GeometryUtils.getDistanceBetweenPoints(line.start, interactionPoint));
    const endDisplacement = this.calculateGravitationalDisplacement(line.end, interactionPoint,
      GeometryUtils.getDistanceBetweenPoints(line.end, interactionPoint));

    // Calculate control point for Bézier curve - attracted to mouse
    const startX = line.start.x + startDisplacement.x;
    const startY = line.start.y + startDisplacement.y;
    const endX = line.end.x + endDisplacement.x;
    const endY = line.end.y + endDisplacement.y;

    // Control point is the midpoint, but displaced AWAY from the mouse (repulsion)
    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    // Calculate gravitational repulsion on the control point
    const controlPoint = { x: midX, y: midY };
    const distanceToControl = GeometryUtils.getDistanceBetweenPoints(controlPoint, interactionPoint);

    // Repulsion effect: control point moves AWAY from mouse
    const controlDisplacement = this.calculateGravitationalDisplacement(
      controlPoint,
      interactionPoint,
      distanceToControl
    );

    // High intensity for dramatic repulsion effect
    const curveIntensity = 4.2; // Much higher intensity for visible curves with strong displacement
    const controlX = midX + (controlDisplacement.x * curveIntensity);
    const controlY = midY + (controlDisplacement.y * curveIntensity);

    this.ctx.strokeStyle = `rgba(255, 255, 255, 0.3141516)`;
    this.ctx.lineWidth = 0.8; // Reduced from 1.0 for more subtle effect
    this.ctx.lineCap = 'round';

    this.ctx.beginPath();
    // Draw curved line using quadratic Bézier curve
    this.ctx.moveTo(startX, startY);
    this.ctx.quadraticCurveTo(controlX, controlY, endX, endY);
    this.ctx.stroke();
  }

  private renderNodes(line: Line, interactionPoint: Point, lineInfluence: number): void {
    [line.start, line.end].forEach((node) => {
      const nodeDistance = GeometryUtils.getDistanceBetweenPoints(node, interactionPoint);
      const canvasDiagonal = Math.sqrt(this.ctx.canvas.width * this.ctx.canvas.width + this.ctx.canvas.height * this.ctx.canvas.height);
      const maxNodeDistance = canvasDiagonal;

      // Static nodes that react to mouse proximity
      const nodeInfluence = Math.max(0, 1 - (nodeDistance / maxNodeDistance));

      if (nodeInfluence > 0.02) { // Higher threshold for performance
        // High visibility for strong repulsion effect
        const nodeAlpha = nodeInfluence * 0.12; // Increased for better visibility of node movement

        if (nodeAlpha < 0.005) return; // Appropriate threshold for subtle effect

        // Calculate gravitational displacement
        const gravitationalPull = this.calculateGravitationalDisplacement(node, interactionPoint, nodeDistance);

        this.ctx.fillStyle = `rgba(255, 255, 255, ${nodeAlpha})`;
        this.ctx.beginPath();
        // Apply gravitational displacement to node position
        this.ctx.arc(
          node.x + gravitationalPull.x,
          node.y + gravitationalPull.y,
          1.2, // Reduced from 2.0 for more subtle effect
          0,
          Math.PI * 2
        );
        this.ctx.fill();
      }
    });
  }

  private calculateGravitationalDisplacement(point: Node | Point, mousePoint: Point, distance: number): { x: number; y: number } {
    if (distance === 0) return { x: 0, y: 0 };

    // Gravitational constant (dramatically increased for strong repulsion)
    const G = 12.0; // Much stronger gravitational force for visible repulsion
    const maxDisplacement = 60; // Much larger displacement for dramatic effect

    // Calculate direction vector from point to mouse
    const dx = mousePoint.x - point.x;
    const dy = mousePoint.y - point.y;

    // Normalize direction
    const length = Math.sqrt(dx * dx + dy * dy);
    if (length === 0) return { x: 0, y: 0 };

    const normalizedDx = dx / length;
    const normalizedDy = dy / length;

    // Calculate gravitational force (stronger when closer) - REPULSION effect
    const force = G / (distance * distance + 1); // Add 1 to avoid division by zero
    const displacement = Math.min(force * 50, maxDisplacement); // Scale and clamp

    // REPULSION: move AWAY from mouse instead of toward it
    return {
      x: -normalizedDx * displacement, // Negative sign for repulsion
      y: -normalizedDy * displacement  // Negative sign for repulsion
    };
  }
}

const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const rendererRef = useRef<CanvasRenderer | null>(null);

  const [interactionState, setInteractionState] = useState<InteractionState>({
    isActive: false,
    currentPoint: null,
    isMouseDown: false
  });

  const [nodes, setNodes] = useState<Node[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  // Input handling service - since canvas covers full viewport, use raw coordinates
  const getCanvasCoordinates = useCallback((clientX: number, clientY: number): Point => {
    return {
      x: clientX,
      y: clientY
    };
  }, []);

  // Optimized animation loop with smooth 60fps for better responsiveness
  const animate = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Initialize renderer if needed
    if (!rendererRef.current) {
      rendererRef.current = new CanvasRenderer(ctx);
    }

    // Render current state
    rendererRef.current.render(lines, interactionState.currentPoint, interactionState.isActive);

    // Smooth 60fps animation for responsive effect
    animationRef.current = requestAnimationFrame(animate);
  }, [lines, interactionState]);

  // Global event handlers to avoid z-index conflicts
  useEffect(() => {
    const handleGlobalMouseMove = (event: MouseEvent) => {
      const point = getCanvasCoordinates(event.clientX, event.clientY);
      cancelFadeOut(); // Cancel any pending fade-out
      setInteractionState(prev => ({
        ...prev,
        currentPoint: point,
        isActive: true
      }));
      startFadeOut(); // Start new fade-out timer
    };

    const handleGlobalMouseDown = (event: MouseEvent) => {
      const point = getCanvasCoordinates(event.clientX, event.clientY);
      setInteractionState({
        isActive: true,
        currentPoint: point,
        isMouseDown: true
      });
    };

    const handleGlobalMouseUp = () => {
      setInteractionState(prev => ({
        ...prev,
        isMouseDown: false
      }));
    };

    const handleGlobalMouseLeave = () => {
      setInteractionState({
        isActive: false,
        currentPoint: null,
        isMouseDown: false
      });
    };

    // Touch events for mobile
    const handleGlobalTouchStart = (event: TouchEvent) => {
      const touch = event.touches[0];
      const point = getCanvasCoordinates(touch.clientX, touch.clientY);
      setInteractionState({
        isActive: true,
        currentPoint: point,
        isMouseDown: true
      });
    };

    const handleGlobalTouchMove = (event: TouchEvent) => {
      const touch = event.touches[0];
      const point = getCanvasCoordinates(touch.clientX, touch.clientY);
      cancelFadeOut(); // Cancel any pending fade-out
      setInteractionState(prev => ({
        ...prev,
        currentPoint: point,
        isActive: true
      }));
      startFadeOut(); // Start new fade-out timer
    };

    const handleGlobalTouchEnd = () => {
      setInteractionState(prev => ({
        ...prev,
        isMouseDown: false
      }));
    };

    // Add global event listeners
    document.addEventListener('mousemove', handleGlobalMouseMove);
    document.addEventListener('mousedown', handleGlobalMouseDown);
    document.addEventListener('mouseup', handleGlobalMouseUp);
    document.addEventListener('mouseleave', handleGlobalMouseLeave);
    document.addEventListener('touchstart', handleGlobalTouchStart, { passive: false });
    document.addEventListener('touchmove', handleGlobalTouchMove, { passive: false });
    document.addEventListener('touchend', handleGlobalTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mousedown', handleGlobalMouseDown);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
      document.removeEventListener('mouseleave', handleGlobalMouseLeave);
      document.removeEventListener('touchstart', handleGlobalTouchStart);
      document.removeEventListener('touchmove', handleGlobalTouchMove);
      document.removeEventListener('touchend', handleGlobalTouchEnd);
    };
  }, [getCanvasCoordinates]);

  // Direct mouse movement detection with smooth transitions
  const fadeOutTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const startFadeOut = useCallback(() => {
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
    }
    fadeOutTimeoutRef.current = setTimeout(() => {
      setInteractionState(prev => ({
        ...prev,
        isActive: false,
        currentPoint: null
      }));
    }, 800); // Extended fade-out for better UX and debugging
  }, []);

  const cancelFadeOut = useCallback(() => {
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
  }, []);

  // Initialize canvas and generate network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initializeNetwork = () => {
      // Use full viewport dimensions for complete coverage
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      canvas.width = viewportWidth;
      canvas.height = viewportHeight;

      const newNodes = NodeGenerator.generateGrid(viewportWidth, viewportHeight);
      const newLines = LineGenerator.generateConnections(newNodes);

      setNodes(newNodes);
      setLines(newLines);
    };

    initializeNetwork();
    window.addEventListener('resize', initializeNetwork);

    return () => {
      window.removeEventListener('resize', initializeNetwork);
    };
  }, []);

  // Animation loop management
  useEffect(() => {
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: 'transparent',
        zIndex: 0
      }}
    />
  );
};

export default InteractiveBackground;

