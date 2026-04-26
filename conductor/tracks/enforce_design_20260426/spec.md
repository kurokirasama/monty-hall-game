# Specification: Enforce DESIGN.md Compliance

## Overview
This track (Chore) focuses on updating the project environment and Conductor configuration to reference and follow the `DESIGN.md` file (generated in a previous track) as the primary source of truth for the project's aesthetic and visual guidelines.

## Functional Requirements
- **GEMINI.md Update:** Add an explicit instruction for AI agents to always consult and follow `DESIGN.md` for UI/UX-related tasks.
- **Product Guidelines Update:** Update `conductor/product-guidelines.md` to reference `DESIGN.md` as the definitive style guide.
- **Workflow Update:** Add a step in `conductor/workflow.md`'s Quality Gates or pre-commit checklist to verify adherence to `DESIGN.md`.

## Non-Functional Requirements
- **Enforcement Level:** The compliance with `DESIGN.md` should be treated as a "Strong Suggestion", meaning it should be listed as a primary reference, but deviations are allowed if properly justified and documented.

## Acceptance Criteria
- `GEMINI.md` contains clear directives regarding `DESIGN.md`.
- `conductor/product-guidelines.md` and `conductor/workflow.md` are updated to incorporate `DESIGN.md` references.