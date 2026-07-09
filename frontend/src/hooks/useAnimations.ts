"use client";
import { useEffect, useRef, useState } from "react";

// ─── SSR guard ────────────────────────────────────────────────────────────────
const isBrowser = typeof window !== "undefined";

// ─── useAnimatedCounter ───────────────────────────────────────────────────────
// Parses a display string like "766,000", "KSh 2.1B", "78.4%"
// and smoothly animates the numeric portion from 0 to its target.
export function useAnimatedCounter(rawValue: string | number, duration = 1500) {
  const str = String(rawValue);
  const [displayed, setDisplayed] = useState(str); // show real value immediately (SSR-safe)
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!isBrowser) return;
    const str = String(rawValue);

    // Extract numeric part and surrounding text
    const match = str.match(/^([^0-9]*)([0-9,.]+)([^0-9]*)$/);
    if (!match) {
      setDisplayed(str);
      return;
    }

    const [, prefix, numStr, suffix] = match;
    const target = parseFloat(numStr.replace(/,/g, ""));
    const isDecimal = numStr.includes(".");
    const decimalPlaces = isDecimal ? numStr.split(".")[1].length : 0;
    // Preserve thousands separator format
    const hasThousands = numStr.includes(",");

    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out expo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = eased * target;

      let formatted: string;
      if (isDecimal) {
        formatted = current.toFixed(decimalPlaces);
      } else if (hasThousands) {
        formatted = Math.round(current).toLocaleString();
      } else {
        formatted = Math.round(current).toString();
      }

      setDisplayed(`${prefix}${formatted}${suffix}`);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [rawValue, duration]);

  return displayed;
}

// ─── useSpotlight ─────────────────────────────────────────────────────────────
// Tracks the mouse position relative to the card and exposes x/y as percentages.
export function useSpotlight() {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      setPos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    const onLeave = () => setPos(null);

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return { ref, pos };
}
