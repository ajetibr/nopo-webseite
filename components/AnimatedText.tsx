"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  text: string;
  className?: string;
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p" | "span";
};

const container = (delay: number, stagger: number): Variants => ({
  hidden: {},
  visible: {
    transition: {
      staggerChildren: stagger,
      delayChildren: delay
    }
  }
});

const word: Variants = {
  hidden: { y: "110%", opacity: 0 },
  visible: {
    y: "0%",
    opacity: 1,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  }
};

export default function AnimatedText({
  text,
  className,
  delay = 0,
  stagger = 0.06,
  as = "h2"
}: Props) {
  const Tag: any = motion[as];
  return (
    <Tag
      variants={container(delay, stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15%" }}
      className={cn("overflow-hidden", className)}
    >
      {text.split(" ").map((w, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-bottom mr-[0.25em] last:mr-0"
        >
          <motion.span variants={word} className="inline-block will-change-transform">
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}
