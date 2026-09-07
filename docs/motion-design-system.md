# Motion design system

Status: foundations only. No components are animated. Apply motion only after the static layout is approved and implementation is requested.

The pendent exposes `data-component="pendent"`, `data-state="off|on"`, `data-light-state`, `data-sound-target`, and `data-parallax-target` hooks. Its art, future glow, ambient layer, and hit area are separate elements. It currently remains decorative and has no interaction or animation; a future controller can own light state, sound, parallax, and page-level lighting without changing the visual markup.

## Principles

- Subtle: use small distances and one clear effect per interaction.
- Calm: use smooth easing with no bounce, overshoot, elastic effects, or decorative loops.
- Responsive: provide immediate input feedback with no interaction delay. Allow interrupted interactions to reverse smoothly.
- Brief interactions, slower entrances: movement should support reading and navigation without holding them up.
- Accessible: respect `prefers-reduced-motion`; content and controls must remain usable without motion.

## Tokens

The source of truth is `src/styles/motion.css`, imported by the global stylesheet. All durations and delays use CSS milliseconds.

| Purpose | Token (`--motion-` prefix) | Default |
| --- | --- | --- |
| Press feedback | `duration-press` | 120ms |
| Hover in and out | `duration-hover` | 160ms |
| Folder card interaction | `duration-folder-card` | 200ms |
| Dismissal | `duration-exit` | 160ms |
| Entrance | `duration-enter` | 400ms |
| Interaction easing | `ease-interaction` | cubic-bezier(0.2, 0, 0.2, 1) |
| Entrance easing | `ease-enter` | cubic-bezier(0.16, 1, 0.3, 1) |
| Exit easing | `ease-exit` | cubic-bezier(0.4, 0, 1, 1) |
| Maximum hover travel | `distance-hover` | 2px |
| Folder card lift | `distance-card-lift` | 3px |
| Maximum entrance travel | `distance-enter` | 8px |
| Hover scale | `scale-hover` | 1.01 |
| Optional press scale | `scale-press` | 0.99 |
| Default delay | `delay` | 0ms |
| Optional entrance stagger step | `stagger` | 40ms |
| Maximum total stagger delay | `stagger-max` | 160ms |

## Future usage

- Hover: use interaction easing and hover timing, with a small color change or at most 2px of translation. Enable hover effects only for `(hover: hover) and (pointer: fine)`.
- Press: use interaction easing and press timing. A 0.99 scale is optional; do not combine multiple decorative effects.
- Entrance: use entrance easing and timing, with opacity and at most 8px of translation. Play once, keep primary content available immediately, and avoid repeated scroll reveals.
- Exit: use exit easing and timing. Never delay navigation or input handling for an animation.
- Stagger: optional for small related groups, with delay capped at `stagger-max`; never stagger essential controls.
- Prefer opacity and transform for movement. Avoid animating layout dimensions, `transition: all`, parallax, and perpetual motion. Focus indicators appear immediately and must not depend on hover.
- Keep tokens in this stylesheet as the single source of truth. If a JavaScript animation library is introduced, its adapter must consume these values, convert milliseconds to seconds where needed, and observe preference changes.

## Reduced motion contract

The media query sets all timing and delays to zero, translation distances to zero, and press scale to one. It only changes tokens; it does not apply animations or globally override component styles.

Future consumers must skip entrance and exit choreography under reduced motion and render the final visible state immediately. Do not leave content hidden in an initial opacity state or depend on animation/transition completion events for functionality. JavaScript-driven motion must also respect the preference at initial render and when it changes.

## Checks when motion is implemented

- Check normal and reduced-motion preferences, including a preference change while the page is open.
- Verify keyboard focus, touch interaction, and rapidly repeated or reversed hover/press input.
- Ensure content remains visible and navigation works with JavaScript disabled or animations skipped.
- Confirm entrances are slower than hover feedback, stagger delays stay capped, and no effect bounces or shifts surrounding layout.
