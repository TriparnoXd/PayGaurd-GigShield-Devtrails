# Design System Specification: Kinetic Anchor

## 1. Overview & Creative North Star
This design system is engineered for the high-velocity world of Zepto delivery partners, balancing the urgency of the "last mile" with the unwavering security of an insurance-tech platform. 

**Creative North Star: The Kinetic Anchor**
The "Kinetic Anchor" philosophy rejects the static, boxy nature of traditional utility apps. Instead, it embraces motion and momentum (Kinetic) while providing a sense of structural stability and safety (Anchor). We achieve this through:
*   **Intentional Asymmetry:** Breaking the vertical center line to guide the eye toward action.
*   **Tonal Architecture:** Using color depth rather than lines to define space.
*   **Editorial Scale:** Using extreme typographic contrast to make critical information unmissable during a ride.

---

## 2. Colors: The Power of Tones
Our palette is a high-contrast dialogue between the deep authority of Zepto Purple and the high-visibility energy of Neon Green.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders for sectioning. Boundaries must be defined solely through background color shifts. 
*   Place a `surface-container-low` (#f9edff) card on a `surface` (#fdf3ff) background to create definition. 
*   Use `surface-container-highest` (#ead5ff) for the most critical interactive elements.

### Surface Hierarchy & Nesting
Treat the UI as a series of physical layers—like stacked sheets of frosted glass.
*   **Base:** `surface` (#fdf3ff)
*   **Layer 1 (Main Content):** `surface-container` (#f2e2ff)
*   **Layer 2 (Elevated Actions):** `surface-container-highest` (#ead5ff)

### The Glass & Gradient Rule
To move beyond a "utility" feel, use **Glassmorphism** for floating elements. Apply a `surface-tint` (#681df7) at 10% opacity with a 20px backdrop blur. 
*   **Signature Textures:** Use a subtle linear gradient (Top-Left: `primary` #681df7 to Bottom-Right: `primary-dim` #5b00e5) for main CTAs to provide visual "soul."

---

## 3. Typography: Editorial Authority
We use **Plus Jakarta Sans** for its modern, geometric clarity and **Manrope** for its functional readability.

*   **Display (Plus Jakarta Sans):** Used for "Big Moments" (e.g., earning milestones). The `display-lg` (3.5rem) should feel heroic and slightly oversized.
*   **Headlines (Plus Jakarta Sans):** Bold and authoritative. Use `headline-lg` (2rem) for screen titles to anchor the user.
*   **Body (Manrope):** The workhorse. `body-lg` (1rem) provides the necessary breathing room for insurance policy details or terms.
*   **Labels (Plus Jakarta Sans):** All-caps with slight letter-spacing (0.05em) for high-visibility metadata (e.g., "ACTIVE COVERAGE").

---

## 4. Elevation & Depth: Tonal Layering
Traditional drop shadows are too "dirty" for this premium aesthetic. We convey height through **Tonal Layering**.

*   **The Layering Principle:** Depth is achieved by "stacking" surface tiers. A `surface-container-lowest` (#ffffff) card placed on a `surface-container-low` (#f9edff) creates a natural, soft lift.
*   **Ambient Shadows:** If an element must "float" (like a persistent 'Emergency' button), use a shadow color tinted with `on-surface` (#38274d). 
    *   *Spec:* Blur: 24px, Y-Offset: 8px, Opacity: 6%.
*   **The Ghost Border Fallback:** If a border is required for accessibility, it must be a "Ghost Border": `outline-variant` (#baa4d2) at 15% opacity. Never 100%.

---

## 5. Components: Fluid Utility

### Buttons (The Kinetic Triggers)
*   **Primary:** Solid `primary` (#681df7) with `on-primary` (#f7f0ff) text. Corner radius: `xl` (3rem). 
*   **High-Vis (Secondary):** `secondary-container` (#c3f400) with `on-secondary-container` (#455900). This is for "Go" or "Start Coverage" actions.
*   **Ghost:** Transparent background with the **Ghost Border** spec and `primary` text.

### Cards & Lists (The Narrative Blocks)
*   **Forbid Dividers:** Do not use lines between list items. Use a `spacing-4` (1rem) vertical gap or a subtle toggle between `surface-container-low` and `surface-container-lowest`.
*   **Shape:** All cards use `md` (1.5rem) or `lg` (2rem) rounded corners to feel approachable.

### Input Fields (The Secure Entry)
*   **Active State:** Instead of a thick border, use a `primary` (#681df7) glow (4px spread) and shift the background color to `surface-container-highest`.

### The "Shield" Indicator (Custom Component)
A persistent, glass-morphic pill at the top of the screen indicating protection status. It uses `secondary-fixed` (#c3f400) text when active to provide high-visibility reassurance.

---

## 6. Do’s and Don’ts

### Do
*   **Do** use asymmetrical margins (e.g., 24px on the left, 32px on the right) to create a sense of forward motion.
*   **Do** lean into the "Neon Green" for critical success states—it is the color of movement.
*   **Do** use `display-sm` (2.25rem) for numeric values like earnings or time; numbers should feel substantial.

### Don't
*   **Don't** use standard black (#000000). Use `on-surface` (#38274d) for a softer, more premium contrast.
*   **Don't** use sharp 90-degree corners. Everything in this system must feel "kinetic" and fluid.
*   **Don't** use more than one shadow level per screen. Let the background tones do the heavy lifting.