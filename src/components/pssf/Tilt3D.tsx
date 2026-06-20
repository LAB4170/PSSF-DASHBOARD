import { useRef, type ReactNode, type CSSProperties } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees */
  max?: number;
  /** Scale on hover */
  scale?: number;
  /** Show moving glare highlight */
  glare?: boolean;
  style?: CSSProperties;
};

/**
 * Lightweight 3D tilt wrapper. Uses pointer events + CSS transforms,
 * respects prefers-reduced-motion (disables transform/glare).
 */
export function Tilt3D({
  children,
  className,
  max = 8,
  scale = 1.015,
  glare = true,
  style,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const glareRef = useRef<HTMLDivElement | null>(null);
  const raf = useRef<number | null>(null);

  const reduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

  function onMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    const lift = Math.min(max, 6);
    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `translate3d(0, -${lift.toFixed(2)}px, 0) scale(${scale})`;
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(420px circle at ${x * 100}% ${y * 100}%, color-mix(in oklab, var(--color-gold) 22%, transparent), transparent 60%)`;
      }
    });
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "translate3d(0, 0, 0) scale(1)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "relative transition-transform duration-200 ease-out will-change-transform [backface-visibility:hidden]",
        className,
      )}
      style={style}
    >
      {children}
      {glare && (
        <div
          ref={glareRef}
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-200 mix-blend-screen"
        />
      )}
    </div>
  );
}
