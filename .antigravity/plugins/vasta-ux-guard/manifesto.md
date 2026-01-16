# Vasta UX/UI Manifesto

> **Version**: 1.0 - Enforced
> **Status**: Active Governance

## Principles

- **Nothing is accidental**: Every pixel has intent.
- **Everything has intent**: If you can't explain it, delete it.
- **Silence over decoration**: Remove noise.
- **Hierarchy over symmetry**: Guide the eye; don't just balance the grid.
- **Restraint over abundance**: Fewer options, more confidence.

## Aesthetics

The interface must feel:

- **Authoritative**
- **Calm**
- **Deliberate**
- **Opinionated**
- **Built for operators, not spectators**

**AVOID "AI SLOP" AESTHETICS AT ALL COSTS.**

## Rules

### Typography

- **Maximum 2 font families total**.
- **Serif**: Implies importance or irreversible decisions.
- **Monospace**: Implies system state or data.
- **FORBIDDEN**: `Inter`, `Roboto`, `Arial`, `system-ui`, `Space Grotesk`.

### Color

- **One dominant mode** (light OR dark).
- **One accent color** with semantic meaning (critical actions/states only).
- **All colors must be CSS variables**.
- **NO friendly palettes** or clichéd gradients.

### Spacing

- Architectural spacing, not decorative.
- Prefer vertical rhythm.
- **No card-heavy layouts**.

### Motion

- Motion must explain **state** or **causality**.
- **NO decorative micro-interactions**.
- **NO bounce** or playful easing.
- Prefer heavier, slower transitions.

## Layout Governance

1.  **Entry / Home**: Must answer "What changed?", "What needs attention?", "What can be ignored?".
2.  **Dashboard**: No card grids. Vertical flow. Typography defines hierarchy.
3.  **Entity Pages**: Heavy and specific. Irreversible actions visually distinct.
