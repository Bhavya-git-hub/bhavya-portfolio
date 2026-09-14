/**
 * The page's ground plane: a faint technical grid that fades out at the top and
 * bottom of its container.
 *
 * Pure CSS — two repeating linear gradients and a mask. An animated canvas here
 * would cost a full-screen repaint for something the reader should never
 * consciously notice.
 */
export function GridBackdrop({ dim = false, className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 -z-10 rule-grid mask-fade-y ${
        // Behind display-sized type the full-strength grid cuts visible lines
        // through the letterforms; behind the hero's smaller copy it reads as
        // texture. One prop rather than two components.
        dim ? "opacity-[0.28]" : "opacity-[0.55]"
      } ${className}`}
    />
  );
}
