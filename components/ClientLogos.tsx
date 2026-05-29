"use client";

import { motion } from "framer-motion";

const clients = [
  "HALIA",
  "ATLAS",
  "NORTHWIND",
  "MODAL",
  "OVO",
  "FORMA",
  "STRATA",
  "KEPLER",
  "MARGIN",
  "FJORD"
];

type Props = {
  variant?: "light" | "dark";
  showHeader?: boolean;
  eyebrow?: string;
};

export default function ClientLogos({
  variant = "dark",
  showHeader = true,
  eyebrow = "In good company"
}: Props) {
  const isDark = variant === "dark";

  return (
    <div
      aria-label="Selected clients"
      className={isDark ? "relative text-paper" : "relative text-ink"}
    >
      {showHeader && (
        <div className="mx-auto max-w-[1400px] px-6 lg:px-12 pb-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.8 }}
            className="flex flex-col md:flex-row md:items-end md:justify-between gap-6"
          >
            <div
              className={
                "flex items-center gap-3 text-xs uppercase tracking-wider2 " +
                (isDark ? "text-paper/40" : "text-mist")
              }
            >
              <span
                className={
                  "h-px w-10 " + (isDark ? "bg-paper/30" : "bg-ink/30")
                }
              />
              <span>{eyebrow}</span>
            </div>
            <p
              className={
                "text-sm font-light max-w-md md:text-right " +
                (isDark ? "text-paper/55" : "text-ink/55")
              }
            >
              A short list of the people who keep coming back. We&apos;re grateful — and
              still very picky.
            </p>
          </motion.div>
        </div>
      )}

      {/* Edge fade */}
      <div
        className={
          "pointer-events-none absolute inset-y-0 left-0 w-32 md:w-48 z-10 " +
          (isDark
            ? "bg-gradient-to-r from-ink to-transparent"
            : "bg-gradient-to-r from-paper to-transparent")
        }
      />
      <div
        className={
          "pointer-events-none absolute inset-y-0 right-0 w-32 md:w-48 z-10 " +
          (isDark
            ? "bg-gradient-to-l from-ink to-transparent"
            : "bg-gradient-to-l from-paper to-transparent")
        }
      />

      {/* Marquee */}
      <div className="overflow-hidden py-6">
        <div className="flex w-max animate-marquee gap-16 md:gap-24">
          {[...Array(2)].map((_, dup) => (
            <div
              key={dup}
              className="flex items-center gap-16 md:gap-24 pr-16 md:pr-24"
            >
              {clients.map((c) => (
                <span
                  key={`${dup}-${c}`}
                  className={
                    "font-display font-black text-3xl md:text-5xl tracking-tightest whitespace-nowrap transition-colors duration-500 " +
                    (isDark
                      ? "text-paper/85 hover:text-paper"
                      : "text-ink/35 hover:text-ink")
                  }
                >
                  {c}
                  <span className="text-accent">.</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
