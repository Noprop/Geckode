---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, or applications. Generates creative, polished code that avoids generic AI aesthetics.
---

# Frontend Design

Create distinctive, production-grade frontend interfaces with a clear aesthetic point-of-view. Implement real working code for components, pages, and full applications.

## Execution Workflow

1. Clarify intent
- Extract purpose, target audience, usage context, and technical stack.
- Capture constraints: framework, performance budget, accessibility needs, browser support, and delivery format.
- Infer missing details when needed and state assumptions briefly before coding.

2. Commit to one bold direction
- Choose a single, explicit aesthetic direction before implementation.
- Use strong, intentional directions such as brutally minimal, maximalist, retro-futuristic, organic, luxury, editorial, brutalist, art deco, playful, industrial, or other clear concepts.
- Define the unforgettable signature: one visual or interaction element that makes the interface memorable.

3. Define a design system first
- Establish CSS variables or tokens for color, type scale, spacing, radius, elevation, and motion timing.
- Pair a characterful display face with a refined body face.
- Avoid overused defaults (for example Inter, Roboto, Arial, or generic system stacks) unless the existing project already requires them.
- Build a dominant palette with deliberate accents; avoid timid, evenly distributed colors.

4. Compose layout with intent
- Use composition choices that fit the concept: asymmetry, overlap, diagonal flow, controlled density, or generous negative space.
- Design mobile and desktop intentionally; avoid treating mobile as an afterthought.
- Use semantic structure and clear visual hierarchy.

5. Implement production-grade code
- Write functional, runnable code in the project stack (HTML/CSS/JS, React, Vue, and similar).
- Keep components reusable and organized.
- Include meaningful states: hover, focus, active, disabled, loading, empty, and error where relevant.
- Ensure keyboard navigation, visible focus treatment, and ARIA or label coverage.
- Preserve design-system consistency through variables or tokens.

6. Add high-impact motion
- Prioritize a few orchestrated moments over scattered micro-effects.
- Use staggered reveals and purposeful transitions for page load and section entry.
- Prefer CSS-only animation for static HTML builds.
- Use a motion library for React when available and provide reduced-motion fallbacks.

7. Build atmospheric detail
- Create depth with gradient meshes, textures, overlays, geometric motifs, dramatic shadows, custom borders, or grain where it fits.
- Keep decorative layers aligned with the chosen direction; remove effects that dilute the concept.

8. Verify and polish
- Check responsiveness across breakpoints.
- Validate contrast and interaction accessibility.
- Run available lint, build, and tests when applicable.
- Remove placeholder styling patterns and generic template traces.

## Aesthetic Guardrails

- Never ship generic "AI slop" styling.
- Never default to clichéd purple-on-white gradient aesthetics.
- Never converge repeatedly on the same typography or theme across different requests.
- Match implementation complexity to the chosen direction:
  - Use elaborate structure and animation for maximalist concepts.
  - Use restraint, rhythm, and precision for minimalist or refined concepts.

## Delivery Format

- Present the chosen concept in 2 to 4 sentences before code changes.
- Deliver complete implementation, not pseudocode.
- Include concise notes on:
  - key visual decisions
  - accessibility considerations
  - performance-sensitive choices
  - assumptions made
