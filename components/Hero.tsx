"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowDown, Sparkles, Play } from "lucide-react";
import MagneticButton from "./MagneticButton";
import DynamicFrame from "./DynamicFrame";

export default function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const blobY1 = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);
  const blobY2 = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative z-10 min-h-screen w-full overflow-hidden bg-paper pt-44 pb-24"
    >
      {/* Soft tinted background */}
      <div className="absolute inset-0 bg-gradient-to-b from-paper via-paper to-fog" />

      {/* Decorative orbs */}
      <motion.div
        style={{ y: blobY1 }}
        className="absolute -left-40 top-20 h-[420px] w-[420px] rounded-full bg-accent/30 blur-3xl animate-floaty"
      />
      <motion.div
        style={{ y: blobY2 }}
        className="absolute -right-32 top-40 h-[360px] w-[360px] rounded-full bg-mist/30 blur-3xl"
      />
      <div className="grain" />

      <motion.div
        style={{ y, opacity }}
        className="relative z-10 mx-auto max-w-[1400px] px-6 lg:px-12"
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-8 flex flex-wrap items-center gap-3"
        >
          <span className="inline-flex h-9 items-center gap-2 rounded-full glass px-4 text-[12px] uppercase tracking-wider2 text-ink/70">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            Kreativ. Strategisch. Digital.
          </span>
          <span className="inline-flex h-9 items-center gap-2 rounded-full glass px-4 text-[12px] uppercase tracking-wider2 text-ink/70">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            Websites, Content & Ads
          </span>
        </motion.div>

        {/* Headline + Frame split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          <div className="lg:col-span-8">
            <h1 className="font-display font-black tracking-tightest leading-[0.95] text-ink text-[clamp(30px,4.4vw,64px)] text-balance max-w-[15ch]">
              <Line text="NOPO Media —" delay={0.1} />
              <Line text={["deine ", { highlight: "Creative Agency" }, " aus Kiel"]} delay={0.25} />
              <Line
                text={["für Social Media & ", { highlight: "Online Marketing" }]}
                delay={0.4}
              />
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.1 }}
              className="mt-10 text-[17px] md:text-lg text-ink/65 font-light leading-relaxed text-pretty max-w-lg"
            >
              Aus dem hohen Norden entwickeln wir individuelle Strategien, die deine
              Reichweite erhöhen, deine Sichtbarkeit verbessern und nachhaltiges Wachstum
              fördern. Wir verbinden kreative Ideen mit technischer Expertise, um deine
              Marke im digitalen Raum langfristig stark zu positionieren.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 1.25 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton
                as="a"
                href="#portfolio"
                className="group relative inline-flex items-center gap-3 rounded-full bg-accent text-ink pl-7 pr-3 py-3.5 text-[15px] font-medium overflow-hidden shadow-floaty"
              >
                <span className="relative z-10">Projekte entdecken</span>
                <span className="relative z-10 inline-flex h-9 w-9 items-center justify-center rounded-full bg-ink text-paper transition-transform duration-500 group-hover:rotate-45">
                  <ArrowDown className="h-4 w-4 -rotate-45" strokeWidth={2.5} />
                </span>
              </MagneticButton>

              <MagneticButton
                as="a"
                href="#about"
                className="group inline-flex items-center gap-3 rounded-full glass-strong text-ink pl-3 pr-5 py-3.5 text-[15px] font-medium"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-ink text-paper">
                  <Play className="h-3.5 w-3.5 fill-paper" strokeWidth={0} />
                </span>
                <span>Lerne uns kennen</span>
              </MagneticButton>
            </motion.div>
          </div>

          {/* Dynamic Frame */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1.1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-4 mt-4 lg:mt-12"
          >
            <DynamicFrame />
          </motion.div>
        </div>

        {/* Footer bar */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
          className="mt-20 md:mt-28 grid grid-cols-2 md:grid-cols-4 gap-8 border-t border-ink/10 pt-8"
        >
          {[
            { v: "40+", l: "Zufriedene Kunden" },
            { v: "3+", l: "Jahre Erfahrung" },
            { v: "1", l: "Ansprechpartner für alles" },
            { v: "100%", l: "Aus dem Norden" }
          ].map((s) => (
            <div key={s.l}>
              <div className="font-display font-bold text-3xl md:text-4xl text-ink">
                {s.v}
              </div>
              <div className="mt-1 text-xs uppercase tracking-wider2 text-mist">
                {s.l}
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}

type Part = string | { highlight: string };

function Line({
  text,
  delay = 0
}: {
  text: string | Part[];
  delay?: number;
}) {
  const parts: Part[] = Array.isArray(text) ? text : [text];
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "105%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
        className="inline-block"
      >
        {parts.map((p, i) =>
          typeof p === "string" ? (
            <span key={i}>{p}</span>
          ) : (
            <span
              key={i}
              className="relative inline-block italic font-display font-medium text-ink"
            >
              <span className="relative z-10 px-2">{p.highlight}</span>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{
                  duration: 0.9,
                  ease: [0.16, 1, 0.3, 1],
                  delay: delay + 0.4
                }}
                style={{ originX: 0 }}
                className="absolute inset-y-2 left-0 right-0 -z-0 rounded-full bg-accent/70"
              />
            </span>
          )
        )}
      </motion.span>
    </span>
  );
}
