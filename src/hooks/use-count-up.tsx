import { useEffect, useRef, useState } from "react";

/**
 * Count-up animation for a numeric display value.
 *
 * Runs once per session (module-level flag keyed by `id`) — a real balance
 * shouldn't "recount" itself on every visit. Later visits render the final
 * value instantly. Easing is ease-out (decelerating into the final number).
 */
const played = new Set<string>();

export function useCountUp(id: string, target: number, durationMs = 450) {
  const alreadyPlayed = played.has(id);
  const [value, setValue] = useState(alreadyPlayed ? target : 0);
  const frame = useRef<number>(0);

  useEffect(() => {
    if (played.has(id)) {
      setValue(target);
      return;
    }
    played.add(id);

    const start = Date.now();
    const tick = () => {
      const t = Math.min(1, Math.max(0, (Date.now() - start) / durationMs));
      const eased = 1 - Math.pow(1 - t, 3); // ease-out cubic
      setValue(target * eased);
      if (t < 1) frame.current = requestAnimationFrame(tick);
    };
    frame.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame.current);
  }, [id, target, durationMs]);

  return value;
}
