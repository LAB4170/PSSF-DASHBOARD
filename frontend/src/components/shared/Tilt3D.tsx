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
 * Lightweight 3D tilt wrapper. Uses pointer events + CSS perspective transforms,
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
    const x = (e.clientX - r.left) / r.width;  // 0–1 left to right
    const y = (e.clientY - r.top) / r.height;  // 0–1 top to bottom

    // Map to [-max, +max] rotation
    const rotateY = (x - 0.5) * max * 2;       // positive = right edge tilts away
    const rotateX = -(y - 0.5) * max * 2;      // positive = top edge tilts toward viewer

    if (raf.current) cancelAnimationFrame(raf.current);
    raf.current = requestAnimationFrame(() => {
      el.style.transform = `perspective(900px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;
      if (glareRef.current) {
        glareRef.current.style.opacity = "1";
        glareRef.current.style.background = `radial-gradient(480px circle at ${x * 100}% ${y * 100}%, color-mix(in oklab, var(--color-gold) 18%, transparent), transparent 55%)`;
      }
    });
  }

  function reset() {
    const el = ref.current;
    if (!el) return;
    if (raf.current) cancelAnimationFrame(raf.current);
    el.style.transform = "perspective(900px) rotateX(0deg) rotateY(0deg)";
    if (glareRef.current) glareRef.current.style.opacity = "0";
  }

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      className={cn(
        "relative transition-transform duration-200 ease-out",
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
