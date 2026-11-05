/** "ΔΥ" drawn as pixels on a 22 by 10 grid, with strokes as heavy as the wordmark's. */
const DELTA_UPSILON =
  "M4 0h2v2h-2zM3 2h4v2h-4zM2 4h2v2h-2zM6 4h2v2h-2zM1 6h2v2h-2zM7 6h2v2h-2zM0 8h10v2h-10z" +
  "M12 0h2v2h-2zM20 0h2v2h-2zM13 2h2v2h-2zM19 2h2v2h-2zM14 4h6v2h-6zM16 6h2v4h-2z";

export function GreekLetters({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 22 10" shapeRendering="crispEdges" aria-hidden="true">
      <path fill="currentColor" d={DELTA_UPSILON} />
    </svg>
  );
}
