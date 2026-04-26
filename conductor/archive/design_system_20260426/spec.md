# Specification: Design System Authoring

## Overview
This track focuses on creating the project's official `DESIGN.md` file, translating the "Monty Hall Simulator" product vision into cohesive, machine-readable design tokens. The generated documentation will establish the visual identity for coding agents and future human developers.

## Functional Requirements
- **Structure:** Generate `DESIGN.md` adhering to the official standard.
- **Frontmatter:** Include machine-readable YAML frontmatter defining design tokens (`color`, `typography`, `layout`, etc.).
- **Mandatory Sections:** Ensure the Markdown body contains the required sections in order: Overview, Colors, Typography, Layout, Elevation & Depth, Shapes, Components, and Do's and Don'ts.
- **Validation:** Ensure the final file passes validation via `npx @google/design.md lint DESIGN.md`.

## Aesthetic Direction
- **Strict 8-Bit Pixel:** The design system will enforce a strict retro aesthetic.
- **Tokens:** Define a restricted 16-color palette derived from the existing `#1a1a2e` background and bright accents (`#0f0`, `#00f`, `#f0f`).
- **Styling Rules:** Formalize hard edges (0px blur radius for box-shadows), blocky components, and "Minecraftia Regular" as the core typography. Soft glows and blurred shadows will be explicitly prohibited in the "Do's and Don'ts" section.

## Out of Scope
- Modifying `style.css` to implement these changes (this track is solely for authoring the specification).