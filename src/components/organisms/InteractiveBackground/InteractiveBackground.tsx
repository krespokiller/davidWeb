import React, { useEffect, useRef, useState } from 'react';
import { INTERACTIVE_BACKGROUND_CONFIG as CONFIG } from '@/const';
import { NodeService, LineService, RenderService } from '@/services/InteractiveBackground';
import type { Point, Node, Line } from '@/models';

/**
 * Simple mouse interaction state
 */
interface InteractionState {
  isActive: boolean;
  currentPoint: Point | null;
}

/**
 * InteractiveBackground Component - Gravitational Deformation Effect
 *
 * This component creates a dynamic background with nodes and connecting lines that
 * deform gravitationally when the mouse moves over them. The effect is subtle and
 * crystal-like, with repulsion physics that make elements move away from the cursor.
 */
export const InteractiveBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const rendererRef = useRef<RenderService | null>(null);
  const fadeOutTimeoutRef = useRef<number | null>(null);

  const [interactionState, setInteractionState] = useState<InteractionState>({
    isActive: false,
    currentPoint: null
  });

  const [nodes, setNodes] = useState<Node[]>([]);
  const [lines, setLines] = useState<Line[]>([]);

  // Animation loop
  const animate = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!rendererRef.current) {
      rendererRef.current = new RenderService(ctx);
    }

    rendererRef.current.render(lines, interactionState.currentPoint, interactionState.isActive);
    animationRef.current = requestAnimationFrame(animate);
  };

  // Fade-out management
  const startFadeOut = () => {
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
    }
    fadeOutTimeoutRef.current = setTimeout(() => {
      setInteractionState(prev => ({
        ...prev,
        isActive: false,
        currentPoint: null
      }));
    }, CONFIG.FADE_OUT_DELAY);
  };

  const cancelFadeOut = () => {
    if (fadeOutTimeoutRef.current) {
      clearTimeout(fadeOutTimeoutRef.current);
      fadeOutTimeoutRef.current = null;
    }
  };

  // Event handlers
  const handleMouseMove = (event: MouseEvent) => {
    const point = { x: event.clientX, y: event.clientY };
    cancelFadeOut();
    setInteractionState({
      currentPoint: point,
      isActive: true
    });
    startFadeOut();
  };

  const handleMouseLeave = () => {
    setInteractionState({
      isActive: false,
      currentPoint: null
    });
  };

  const handleTouchMove = (event: TouchEvent) => {
    const touch = event.touches[0];
    const point = { x: touch.clientX, y: touch.clientY };
    cancelFadeOut();
    setInteractionState({
      currentPoint: point,
      isActive: true
    });
    startFadeOut();
  };

  const handleTouchEnd = () => {
    setInteractionState(prev => ({
      ...prev,
      isActive: false
    }));
  };

  // Setup event listeners
  useEffect(() => {
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('touchmove', handleTouchMove, { passive: false });
    document.addEventListener('touchend', handleTouchEnd);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  // Initialize canvas and network
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const initializeNetwork = () => {
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;

      canvas.width = viewportWidth;
      canvas.height = viewportHeight;

      const newNodes = NodeService.createGrid(viewportWidth, viewportHeight);
      const newLines = LineService.createConnections(newNodes);

      setNodes(newNodes);
      setLines(newLines);
    };

    initializeNetwork();
    window.addEventListener('resize', initializeNetwork);

    return () => {
      window.removeEventListener('resize', initializeNetwork);
    };
  }, []);

  // Start animation
  useEffect(() => {
    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [nodes, lines, interactionState]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{
        background: 'transparent',
        zIndex: 0,
        width: '100vw',
        height: '100vh',
        margin: 0,
        padding: 0,
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
      role="presentation"
      aria-hidden="true"
    />
  );
};
