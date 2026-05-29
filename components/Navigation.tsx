"use client";

import {
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform
} from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { cn } from "@/lib/utils";

const items = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Portfolio", href: "#portfolio" },
  { label: "About Us", href: "#about" }
];

export default function Navigation() {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("Home");
  const [hovered, setHovered] = useState<string | null>(null);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 40);
  });

  const width = useTransform(
    scrollY,
    [0, 200],
    ["min(960px, 92vw)", "min(720px, 90vw)"]
  );
  const padding = useTransform(scrollY, [0, 200], ["10px 14px", "8px 10px"]);

  // The pill follows hover if hovering, otherwise sits on active item
  const focused = hovered ?? active;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      className="fixed top-5 inset-x-0 z-[60] flex justify-center pointer-events-none"
    >
      <motion.nav
        style={{ width, padding }}
        className={cn(
          "pointer-events-auto flex items-center justify-between gap-4 rounded-full",
          "glass-strong shadow-floaty transition-[box-shadow,background] duration-500",
          scrolled && "shadow-soft"
        )}
      >
        {/* Logo */}
        <Link
          href="#home"
          className="flex items-center pl-2 group"
          onClick={() => setActive("Home")}
        >
          <motion.span
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative inline-flex items-center justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-black.png"
              alt="NOPO Logo"
              className="h-7 w-auto object-contain"
            />
          </motion.span>
        </Link>

        {/* Menu — hover-glide pill via layoutId */}
        <ul
          onMouseLeave={() => setHovered(null)}
          className="hidden md:flex items-center gap-1 text-[13px] font-medium text-ink/80"
        >
          {items.map((it) => {
            const isFocused = focused === it.label;
            const isActive = active === it.label;
            return (
              <li
                key={it.label}
                onMouseEnter={() => setHovered(it.label)}
                className="relative"
              >
                <Link
                  href={it.href}
                  onClick={() => {
                    setActive(it.label);
                    setHovered(it.label);
                  }}
                  className={cn(
                    "relative px-4 py-2 rounded-full transition-colors duration-300",
                    isFocused ? "text-ink" : "hover:text-ink"
                  )}
                >
                  {isFocused && (
                    <motion.span
                      layoutId="nav-pill"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30,
                        mass: 0.6
                      }}
                      className={cn(
                        "absolute inset-0 rounded-full -z-0",
                        isActive ? "bg-ink/[0.08]" : "bg-ink/[0.05]"
                      )}
                    />
                  )}
                  <motion.span
                    whileHover={{ y: -1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 18 }}
                    className="relative z-10 inline-block"
                  >
                    {it.label}
                  </motion.span>
                  {isActive && (
                    <motion.span
                      layoutId="nav-active-dot"
                      transition={{
                        type: "spring",
                        stiffness: 380,
                        damping: 30
                      }}
                      className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-1 w-1 rounded-full bg-accent"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* CTA */}
        <MagneticButton
          as="a"
          href="#contact"
          className="group relative inline-flex items-center gap-1.5 rounded-full bg-ink text-paper pl-4 pr-3 py-2 text-[13px] font-medium overflow-hidden"
        >
          <span className="relative z-10">Start a project</span>
          <span className="relative z-10 inline-flex h-6 w-6 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45">
            <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/30 to-accent/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
        </MagneticButton>
      </motion.nav>
    </motion.header>
  );
}
