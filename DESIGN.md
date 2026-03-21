# Design System Strategy: The Cinematic Minimalist

## 1. Overview & Creative North Star
The Creative North Star for this design system is **"The Digital Gallery."** 

This system moves beyond the standard "portfolio template" by treating every screen as a curated editorial layout. We reject the rigid, boxy constraints of traditional web design in favor of intentional asymmetry, oversized typography, and deep, atmospheric layering. The goal is to create a sense of "Cinematic Stillness"—where generous whitespace (negative space) isn't just empty, but a functional element that directs the user's eye toward high-impact content. By utilizing a high-contrast dark palette paired with "Electric" accents, we achieve a premium, late-night studio aesthetic that feels both professional and avant-garde.

---

## 2. Colors & Tonal Depth

The palette is rooted in a deep, nocturnal foundation (`surface: #131316`) to allow the electric accent colors to "pop" with neon-like intensity.

### The "No-Line" Rule
**Explicit Instruction:** Designers are prohibited from using 1px solid borders to define sections or cards. Boundaries must be articulated through background color shifts. For example, a main content area using `surface` might transition into a footer using `surface-container-low`, or a featured project card using `surface-container-high` sitting on a `surface` backdrop.

### Surface Hierarchy & Nesting
Depth is achieved through a "Physical Stack" mental model. Use the `surface-container` tiers to represent proximity to the user:
*   **Background Layer:** `surface-container-lowest` (#0e0e11) — Used for the deep background or "void" areas.
*   **Base Layer:** `surface` (#131316) — The standard canvas for most content.
*   **Elevated Layer:** `surface-container-high` (#2a2a2d) — Used for interactive elements or featured blocks.
*   **Peak Layer:** `surface-container-highest` (#353438) — Reserved for modals or floating navigation.

### The Glass & Gradient Rule
To move beyond a flat UI, use **Glassmorphism** for floating elements (like Navigation Bars or Tooltips).
*   **Formula:** `surface_variant` at 40% opacity + `backdrop-blur: 20px`.
*   **Signature Texture:** Main CTAs should not be flat. Apply a subtle linear gradient from `primary` (#c9bfff) to `primary_container` (#5a2af8) at a 135-degree angle to provide a "lit-from-within" professional polish.

---

## 3. Typography
The typographic soul of this system is the contrast between the technical precision of **Space Grotesk**, the editorial authority of **Manrope**, and the functional clarity of **Inter**.

*   **Display & Headlines (Manrope):** Use `display-lg` and `headline-lg` for project titles. These should be set with tight letter-spacing (-0.02em) to feel like a premium fashion magazine.
*   **Body (Inter):** All long-form text must use `body-lg` or `body-md`. Inter provides the "workhorse" legibility required for professional bios and case studies.
*   **Labels (Space Grotesk):** Use `label-md` for metadata (dates, categories, tags). The monospaced-adjacent feel of Space Grotesk adds a "high-tech" sophistication to the minimalist layout.

---

## 4. Elevation & Depth

### The Layering Principle
Forget shadows as a default. Use **Tonal Layering**. Place a `surface-container-low` card inside a `surface` section. This creates a soft, sophisticated lift that feels integrated into the architecture of the page rather than an afterthought.

### Ambient Shadows
When a "floating" effect is required (e.g., a project preview following the cursor):
*   **Blur:** 40px to 60px.
*   **Opacity:** 4%–8%.
*   **Color:** Use a tinted shadow based on `on_surface` (#e4e1e6) rather than pure black. This mimics natural ambient light reflecting off a dark surface.

### The "Ghost Border" Fallback
If a border is required for accessibility:
*   Use `outline_variant` (#484554) at **15% opacity**. 
*   **Prohibition:** Never use 100% opaque, high-contrast borders. They break the "Gallery" illusion.

---

## 5. Components

### Buttons
*   **Primary:** Gradient fill (`primary` to `primary_container`), `roundness-md` (0.375rem). No border.
*   **Secondary:** Ghost style. No fill, `outline_variant` at 20% opacity. Text in `primary`.
*   **Tertiary:** Text-only using `label-md` in `secondary` (#a6e6ff) with a subtle underline on hover.

### Cards & Project Previews
*   **Rule:** Forbid divider lines. 
*   **Structure:** Use `spacing-8` (2.75rem) to separate content blocks. Use a `surface-container-low` background to define the card area. Imagery should have `roundness-lg` (0.5rem).

### Inputs & Fields
*   **Styling:** Fill with `surface-container-highest`. No border.
*   **Focus State:** A 1px "Ghost Border" using `primary` at 40% opacity and a subtle outer glow using the `primary` token at 10% opacity.

### Interactive "Liquid" Chips
*   **Selection Chips:** Use `secondary_container` with `on_secondary_container` text. Use `roundness-full` for a pill shape that contrasts against the sharper grid.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical margins. For example, a headline might be offset to the left while the body text is pushed 30% from the right.
*   **Do** use `spacing-24` (8.5rem) between major sections to let the design breathe.
*   **Do** use `secondary` (#a6e6ff) for small UI accents like "Current Status" dots or active nav indicators.

### Don't
*   **Don't** use pure black (#000000). Always use the `surface` tokens to maintain tonal depth.
*   **Don't** use standard 12-column grids for everything. Experiment with "broken" grids where images overlap text containers.
*   **Don't** use heavy drop shadows. If you can clearly see the shadow, it’s too dark.
*   **Don't** use icons with varying line weights. Stick to thin-stroke (1.5px) sans-serif icons to match Inter and Manrope.