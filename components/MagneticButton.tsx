"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { useRef, ReactNode, MouseEvent } from "react";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "button" | "a";
  href?: string;
  onClick?: () => void;
};

export default function MagneticButton({
  children,
  className,
  strength = 24,
  as = "button",
  href,
  onClick
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    const relX = e.clientX - (r.left + r.width / 2);
    const relY = e.clientY - (r.top + r.height / 2);
    x.set((relX / r.width) * strength);
    y.set((relY / r.height) * strength);
  };

  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  const Tag: any = as === "a" ? motion.a : motion.button;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      <Tag
        href={href}
        onClick={onClick}
        whileTap={{ scale: 0.96 }}
        transition={{ type: "spring", stiffness: 400, damping: 22 }}
        className={cn(
          "inline-flex items-center gap-2 select-none cursor-pointer",
          className
        )}
      >
        {children}
      </Tag>
    </motion.div>
  );
}
