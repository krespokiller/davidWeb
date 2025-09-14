# InteractiveBackground - Gravitational Deformation Effect

## Overview

This component creates a dynamic background with nodes and connecting lines that deform gravitationally when the mouse moves over them. The effect uses repulsion physics to create a crystal-like appearance.

## How It Works

### 1. Node Grid Generation

The effect starts by creating a grid of nodes across the screen:

```typescript
// Creates nodes every 60px horizontally and vertically
for (let x = 0; x <= width; x += 60) {
  for (let y = 0; y <= height; y += 60) {
    nodes.push({ x, y, id: id++ });
  }
}
```

### 2. Line Connections

Nodes within 120px of each other get connected with lines:

```typescript
// Connect nodes if they're close enough
if (distance <= 120) {
  lines.push({ start: node1, end: node2, distance });
}
```

### 3. Gravitational Physics

Each node and line segment experiences gravitational repulsion from the mouse:

```typescript
// Calculate repulsion force
const force = G / (distance² + 1);  // Inverse square law
const displacement = Math.min(force * 50, maxDisplacement);

// Move AWAY from mouse (repulsion)
return {
  x: -normalizedDx * displacement,
  y: -normalizedDy * displacement
};
```

### 4. Bézier Curve Deformation

Lines are rendered as quadratic Bézier curves that bend away from the mouse:

```typescript
// Control point moves away from mouse
const controlX = midX + (displacement.x * intensity);
const controlY = midY + (displacement.y * intensity);

// Draw curved line
ctx.moveTo(startX, startY);
ctx.quadraticCurveTo(controlX, controlY, endX, endY);
```

## Configuration

All parameters are centralized in `interactiveBackground.config.ts`:

- `NODE_SPACING`: Distance between nodes (60px)
- `GRAVITY_DESKTOP`: Gravitational strength on desktop (12.0)
- `LINE_OPACITY`: Transparency of connecting lines (0.08)
- `INFLUENCE_RADIUS_MULTIPLIER`: How far the effect reaches (4.0x node spacing)

## Performance Optimizations

1. **Distance Culling**: Only render elements within influence radius
2. **Influence Threshold**: Skip elements with negligible effect
3. **Mobile Optimizations**: Reduced parameters on smaller screens

## Mathematical Concepts

### Gravitational Force
```
F = G / (r² + 1)
```
- `G`: Gravitational constant (12.0 on desktop)
- `r`: Distance from mouse to element
- Force decreases with square of distance

### Displacement Calculation
```
displacement = min(F × 50, maxDisplacement)
position = original + (-direction × displacement)
```
- Elements move away from mouse (negative direction)
- Displacement is clamped to prevent extreme movements

### Bézier Curve Control
```
controlPoint = midpoint + (displacement × intensity)
```
- Control point moves away from mouse
- Intensity varies by screen size (4.2 desktop, 3.2 mobile)

## Usage

Simply include the component in your React app:

```tsx
import InteractiveBackground from './components/InteractiveBackground';

function App() {
  return (
    <div>
      <InteractiveBackground />
      {/* Your content here */}
    </div>
  );
}
```

## Customization

To modify the effect:

1. **Change node density**: Adjust `NODE_SPACING` in config
2. **Modify strength**: Change `GRAVITY_DESKTOP`/`GRAVITY_MOBILE`
3. **Adjust visibility**: Modify `LINE_OPACITY` and `NODE_OPACITY`
4. **Change reach**: Update `INFLUENCE_RADIUS_MULTIPLIER`

## Browser Support

- Modern browsers with Canvas 2D API support
- Touch events for mobile devices
- Responsive design with mobile optimizations