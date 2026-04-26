---
version: alpha
tokens:
  color:
    background: "#1a1a2e"
    surface: "#0f0f1a"
    surface_alt: "#1a1a3e"
    primary: "#0f0"
    secondary: "#00f"
    accent: "#f0f"
    text: "#e0e0e0"
    text_muted: "#fff"
    error: "#f00"
    button: "#6a0572"
    button_hover: "#8a0792"
  typography:
    family:
      retro: '"Minecraftia Regular", cursive'
    size:
      h1: "2em"
      h2: "1.5em"
      label: "2em"
      body: "0.95em"
      button: "0.8em"
  layout:
    container_max_width: "900px"
    spacing:
      gap: "20px"
      padding: "30px"
  elevation:
    shadow_blur: "0px"
    shadow_spread: "15px"
---

# Design System: Monty Hall Simulator

## Overview
The Monty Hall Simulator design system establishes a strict **8-Bit Retro Pixel-Art** visual identity. It aims to evoke the nostalgia of classic arcade games while providing a clear, interactive educational experience. The design prioritizes instant feedback, high contrast, and blocky, geometric shapes.

## Colors
The system uses a restricted palette derived from classic CRT and arcade color schemes:
- **Background**: `#1a1a2e` (Deep Midnight Blue)
- **Surface**: `#0f0f1a` (Dark Navy)
- **Primary**: `#0f0` (Neon Green) - Used for headings, success states, and selections.
- **Secondary**: `#00f` (Pure Blue) - Used for borders and primary shadows.
- **Accent**: `#f0f` (Magenta) - Used for status messages and highlights.
- **Error**: `#f00` (Pure Red) - Used for open doors and perishing.

## Typography
- **Primary Font**: "Minecraftia Regular". This is the only font permitted for all UI elements.
- **Tone**: Simple and direct. Text should be minimal and action-oriented.
- **Styling**: Headings and labels use glow effects (text-shadow) for visibility against dark backgrounds.

## Layout
- **Container-centric**: All content is centered within a bordered container.
- **Responsive**: Layout shifts from a horizontal flex row to a vertical column on smaller screens (<768px).
- **Spacing**: Use standard gaps (20px) between interactive elements.

## Elevation & Depth
- **Shadows**: Elevation is represented by solid, non-blurred shadows (`0px` blur radius).
- **Glows**: Inset and outer glows are used to emphasize selection and state changes, but must maintain a blocky feel.

## Shapes
- **Blocky**: All components must have defined borders (1px to 3px) and slightly rounded corners (8px to 10px) to simulate CRT screen edges.
- **Hard Edges**: Avoid any anti-aliasing or smooth gradients in the UI components.

## Components
- **Doors**: Vertical rectangles with thick borders and distinct states:
  - Default: Blue border, black background.
  - Selected: Green border, green background.
  - Open: Red border, black background.
- **Buttons**: Purple rectangles with uppercase text, using hard drop-shadows for a "clickable" feel.

## Do's and Don'ts
### Do
- Use high-contrast color combinations.
- Maintain a 1:1 pixel aspect ratio for all game assets.
- Provide immediate audio and visual confirmation for every click.

### Don't
- **Don't** use blurred shadows or soft gradients.
- **Don't** use modern sans-serif or serif fonts.
- **Don't** use complex animations; stick to state-based transitions.
- **Don't** allow UI elements to overlap in a way that obscures the retro border style.