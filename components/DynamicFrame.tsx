"use client";

import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
  useVelocity
} from "framer-motion";
import { useEffect, useRef } from "react";
import { Play } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
  label?: string;
  caption?: string;
};

/**
 * A floating decorative frame whose corner radius, scale, rotation and
 * inner accent fluidly respond to cursor proximity and scroll velocity.
 * Drop it anywhere — it positions itself absolutely relative to its parent.
 */
export default function DynamicFrame({
  className,
  label = "Showreel · 2026",
  caption = "01:24"
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  // --- Scroll velocity → radius / tilt ---
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(velocity, { stiffness: 200, damping: 32, mass: 0.6 });
  const radius = useTransform(smoothVelocity, [-2000, 0, 2000], [32, 56, 32]);
  const rotate = useTransform(smoothVelocity, [-2000, 0, 2000], [-3, 0, 3]);
  const innerScale = useTransform(smoothVelocity, [-2000, 0, 2000], [1.06, 1, 1.06]);

  // --- Cursor proximity → tilt + scale ---
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const proximity = useMotionValue(1);
  const sx = useSpring(px, { stiffness: 120, damping: 18, mass: 0.6 });
  const sy = useSpring(py, { stiffness: 120, damping: 18, mass: 0.6 });
  const sProx = useSpring(proximity, { stiffness: 120, damping: 18, mass: 0.6 });
  const scale = useTransform(sProx, [0, 1], [1.04, 1]);
  const tiltX = useTransform(sy, [-200, 200], [6, -6]);
  const tiltY = useTransform(sx, [-200, 200], [-6, 6]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const el = ref.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      px.set(dx);
      py.set(dy);
      const dist = Math.hypot(dx, dy);
      // Normalise: 0 (near) → 1 (far). Influence drops off past ~600px.
      proximity.set(Math.min(1, dist / 600));
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [px, py, proximity]);

  return (
    <motion.div
      ref={ref}
      style={{
        borderRadius: radius,
        rotate,
        scale,
        rotateX: tiltX,
        rotateY: tiltY,
        transformPerspective: 1000
      }}
      className={cn(
        "relative aspect-[4/5] w-full overflow-hidden bg-ink text-paper shadow-floaty",
        "will-change-transform",
        className
      )}
    >
      {/* Animated gradient bg */}
      <motion.div
        style={{ scale: innerScale }}
        className="absolute inset-0 bg-gradient-to-br from-ink via-[#1f3a47] to-accent"
      />
      {/* Subtle grid */}
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.08]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="dyngrid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M32 0H0V32" fill="none" stroke="#fff" strokeWidth="0.6" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#dyngrid)" />
      </svg>

      {/* Pulsing center play */}
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
          className="relative inline-flex h-16 w-16 md:h-20 md:w-20 items-center justify-center rounded-full bg-accent text-ink"
        >
          <Play className="h-5 w-5 md:h-6 md:w-6 fill-ink" strokeWidth={0} />
          <span className="absolute inset-0 rounded-full ring-1 ring-paper/40 animate-ping" />
        </motion.span>
      </div>

      {/* Corner labels */}
      <div className="absolute top-5 left-5 right-5 flex items-center justify-between text-[10px] uppercase tracking-wider2 text-paper/70">
        <span>{label}</span>
        <span className="inline-flex items-center gap-2">
          <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
          Live
        </span>
      </div>
      <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo-white.png"
          alt="NOPO Logo"
          className="h-7 w-auto object-contain"
        />
        <span className="font-display text-xs text-paper/60 tracking-wider2">
          {caption}
        </span>
      </div>

      <div className="grain opacity-[0.07]" />
    </motion.div>
  );
}
