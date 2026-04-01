# Design System Strategy: The Kinetic Anchor

## 1. Overview & Creative North Star
The visual identity of this design system is built upon the **"Kinetic Anchor."** 

In the high-velocity, high-stress world of quick-commerce delivery, riders operate in a state of constant motion. This design system seeks to mirror that energy through vibrant brand expression while providing a "Shield"—a rock-solid, trustworthy anchor of information. 

To move beyond the "standard app" aesthetic, we utilize **Editorial Asymmetry**. By pairing oversized, high-contrast typography with generous whitespace and overlapping container elements, we create a layout that feels custom-tailored. We eschew the rigid, boxed-in grids of utility apps in favor of a layered, fluid experience that prioritizes rapid-scan legibility and "big-thumb" ergonomics.

---

## 2. Colors & Surface Logic
The palette leverages the high-octane energy of Zepto’s Purple and Magenta, tempered by a deep, authoritative Navy.

### The "No-Line" Rule
To maintain a premium, editorial feel, **1px solid borders are strictly prohibited for sectioning.** Boundaries must be defined through tonal shifts. A section should be distinguished by moving from `surface` (`#faf8ff`) to `surface-container-low` (`#f2f3ff`). This creates a cleaner, modern interface that feels less cluttered under sunlight.

### Surface Hierarchy & Nesting
We treat the UI as a series of physical layers. 
*   **Base:** `background` (`#faf8ff`)
*   **Large Content Blocks:** `surface-container-low` (`#f2f3ff`)
*   **Interactive Cards:** `surface-container-lowest` (`#ffffff`) placed atop a container-low background to create a subtle, natural lift.
*   **Floating Elements:** Use Glassmorphism. Apply `surface-tint` at 10% opacity with a `backdrop-blur` of 20px to create a "frosted glass" effect for navigation bars or floating action buttons.

### Signature Textures
Main Call-to-Actions (CTAs) should not be flat. Use a subtle linear gradient transitioning from `primary` (`#5700db`) to `primary_container` (`#702dff`) at a 135-degree angle. This adds "soul" and a sense of depth that signals premium quality.

---

## 3. Typography: Editorial Authority
We use **Plus Jakarta Sans** for its geometric clarity and modern "tech-forward" spirit.

*   **Display & Headline (The Hook):** Use `display-md` or `headline-lg` with tight letter spacing (-0.02em). These should be used for high-impact numbers (e.g., "98% Protected") or status headers.
*   **Title (The Anchor):** `title-lg` and `title-md` serve as the primary navigation points within cards.
*   **Body & Label (The Utility):** `body-lg` is our standard for readability. For delivery riders in motion, never drop below `body-md` for critical information.

The hierarchy is intentionally steep. By making headers significantly larger than body text, we create a "scannable map" for the rider, allowing them to digest the most important data in a split-second glance.

---

## 4. Elevation & Depth
Depth is achieved through **Tonal Layering** rather than structural shadows.

*   **The Layering Principle:** Avoid "drop shadows" on standard cards. Instead, nest a `surface-container-lowest` card inside a `surface-container-high` section. The change in brightness creates a sophisticated sense of elevation.
*   **Ambient Shadows:** If an element must float (like a bottom sheet or a critical alert), use an extra-diffused shadow: `offset: 0, 12; blur: 32; color: rgba(19, 27, 46, 0.06)`. Note the use of a Navy tint (`on_surface`) instead of pure black to keep the shadows "airy."
*   **The Ghost Border:** If accessibility requires a stroke (e.g., in high-glare environments), use a "Ghost Border": `outline-variant` (`#cbc3d9`) at 20% opacity.

---

## 5. Components

### Buttons (Kinetic Triggers)
*   **Primary:** Vibrant Gradient (`primary` to `primary_container`), `roundness-xl` (3rem), white text.
*   **Secondary:** Solid `secondary` (`#b60059`) for urgent actions (e.g., "Report Incident").
*   **Tertiary:** Transparent background with `on_surface` text, used for low-priority dismissals.

### Cards & Lists (The Integrated Grid)
*   **Rule:** **No divider lines.**
*   Separation is achieved via `spacing-6` (1.5rem) vertical gaps or by alternating background tiers (`surface-container-low` vs `surface-container-highest`).
*   **Roundedness:** Use `DEFAULT` (1rem/16px) for inner nested elements and `xl` (3rem) for primary screen containers to emphasize the friendly, protective "Shield" brand.

### Input Fields
*   Surface: `surface-container-highest` (`#dae2fd`).
*   Focus State: A 2px "Ghost Border" using `primary` at 40% opacity.
*   Shape: `roundness-md` (1.5rem) to maintain the soft, ergonomic feel.

### Specialized Component: The "Quick-Pulse" Progress Bar
For insurance claims or onboarding, use a thick, `roundness-full` track. The "filled" portion uses a Magenta-to-Purple gradient to signify progress and energy.

---

## 6. Do’s and Don’ts

### Do
*   **Use Intentional Asymmetry:** Align text to the left but allow imagery or large "Display" numbers to break the grid and bleed toward the right edge.
*   **Prioritize Touch Targets:** Given the "high-stress environment," every interactive element must have a minimum hit area of 48x48dp, utilizing `spacing-4` padding.
*   **Embrace Whitespace:** Use `spacing-8` or `spacing-10` between major sections to let the design breathe and reduce cognitive load.

### Don’t
*   **Don't use 100% Black:** Always use `on_background` (`#131b2e`) for text to maintain a high-end editorial feel. Pure black is too harsh for this sophisticated palette.
*   **Don't use Sharp Corners:** Anything under `roundness-DEFAULT` (16px) is prohibited. We want the UI to feel "soft to the touch" and approachable.
*   **Don't use Standard Dividers:** A line is a missed opportunity for a tonal shift. If you feel you need a divider, increase the whitespace instead.