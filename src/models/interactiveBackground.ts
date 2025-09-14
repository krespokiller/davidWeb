/**
 * Interfaces and types for InteractiveBackground component
 */

export interface Point {
  x: number;
  y: number;
}

export interface Node {
  x: number;
  y: number;
  id: number;
}

export interface Line {
  start: Node;
  end: Node;
  distance: number;
}