"use client";

import { motion } from "framer-motion";
import {
  Share2,
  Globe,
  Search,
  Megaphone,
  Video,
  Camera,
  ArrowUpRight
} from "lucide-react";
import AnimatedText from "./AnimatedText";
import { cn } from "@/lib/utils";
import { useState } from "react";

type Service = {
  title: string;
  blurb: string;
  tags: string[];
  icon: React.ElementType;
  span: string;
  tone: "light" | "accent" | "dark";
};

const services: Service[] = [
  {
    title: "Social Media",
    blurb:
      "Wir übernehmen deine Kanäle komplett – von der Strategie über die Content-Produktion bis zum Community Management. Organisches Wachstum, das bleibt.",
    tags: ["Strategie", "Content", "Performance"],
    icon: Share2,
    span: "md:col-span-7 md:row-span-2",
    tone: "light"
  },
  {
    title: "Websites",
    blurb:
      "Dein gesamter Webauftritt entsteht bei uns: vom UX/UI-Design über die Entwicklung bis zum Live-Gang.",
    tags: ["Development", "UX/UI-Design"],
    icon: Globe,
    span: "md:col-span-5",
    tone: "accent"
  },
  {
    title: "SEO & GEO",
    blurb:
      "Deine Auffindbarkeit in der Region steuern wir ganzheitlich – von der SEO-Analyse über die Content-Optimierung bis zur lokalen Platzierung für planbaren Kundenzulauf.",
    tags: ["Keywords", "Ranking", "Reichweite"],
    icon: Search,
    span: "md:col-span-3",
    tone: "dark"
  },
  {
    title: "Ads",
    blurb:
      "Wir planen, gestalten und optimieren deine gesamte Onlinewerbung – Tag für Tag.",
    tags: ["Google", "Meta"],
    icon: Megaphone,
    span: "md:col-span-2",
    tone: "light"
  },
  {
    title: "Video",
    blurb:
      "Eventvideos, Imagefilme und Social-Media-Content entstehen bei uns – direkt einsatzbereit für all deine Kanäle.",
    tags: ["Konzept", "Dreh", "Schnitt"],
    icon: Video,
    span: "md:col-span-7",
    tone: "light"
  },
  {
    title: "Foto",
    blurb:
      "Wir fotografieren deine Events, Produkte und dein Team für Content auf Premium-Niveau.",
    tags: ["Shooting", "Retusche"],
    icon: Camera,
    span: "md:col-span-5",
    tone: "light"
  }
];

export default function Services() {
  return (
    <section id="services" className="relative z-10 py-32 md:py-44 bg-paper">
      {/* Section header */}
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-mist mb-6">
              <span className="h-px w-10 bg-ink/30" />
              <span>02 · Was wir machen</span>
            </div>
            <AnimatedText
              as="h2"
              text="Das ganze Spektrum. Aus einer Hand."
              className="font-display font-bold tracking-tightest leading-[1.0] text-[clamp(30px,3.6vw,52px)] text-ink max-w-[19ch]"
            />
          </div>
          <p className="md:max-w-sm text-ink/60 font-light text-pretty leading-relaxed">
            Von performanten Websites und Social-Media-Konzepten über professionelle
            Foto- und Videoproduktionen bis hin zu strategischem SEO und Ads: Wir agieren
            als nahtlose Erweiterung deines Teams.
          </p>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 auto-rows-[minmax(220px,_auto)]">
          {services.map((s, i) => (
            <ServiceCard key={s.title} {...s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  title,
  blurb,
  tags,
  icon: Icon,
  span,
  tone,
  index
}: Service & { index: number }) {
  const [hover, setHover] = useState(false);

  const toneStyles = {
    light: "bg-fog text-ink",
    accent: "bg-accent text-ink",
    dark: "bg-ink text-paper"
  }[tone];

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative overflow-hidden rounded-4xl md:rounded-5xl p-7 md:p-9 cursor-pointer",
        "transition-shadow duration-500 md:min-h-[340px]",
        "hover:shadow-floaty",
        toneStyles,
        span
      )}
    >
      {/* Animated bg blob on hover */}
      <motion.div
        animate={{
          scale: hover ? 1.2 : 0.4,
          opacity: hover ? 1 : 0
        }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "pointer-events-none absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl",
          tone === "accent" && "bg-paper/40",
          tone === "dark" && "bg-accent/30",
          tone === "light" && "bg-accent/30"
        )}
      />

      <div className="relative z-10 flex h-full flex-col justify-between gap-10">
        <div className="flex items-start justify-between">
          <span
            className={cn(
              "inline-flex h-12 w-12 items-center justify-center rounded-2xl",
              tone === "dark" ? "bg-paper/10 text-paper" : "bg-ink text-paper",
              tone === "accent" && "bg-ink text-accent"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <motion.span
            animate={{ rotate: hover ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className={cn(
              "inline-flex h-10 w-10 items-center justify-center rounded-full",
              tone === "dark"
                ? "bg-paper/10 text-paper"
                : "bg-ink/[0.06] text-ink",
              tone === "accent" && "bg-ink/10 text-ink"
            )}
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2} />
          </motion.span>
        </div>

        <div>
          <h3 className="font-display font-bold tracking-tightest text-[clamp(22px,2.6vw,36px)] leading-tight">
            {title}
          </h3>
          <p
            className={cn(
              "mt-3 max-w-md text-sm md:text-[15px] leading-relaxed font-light",
              tone === "dark" ? "text-paper/60" : "text-ink/65"
            )}
          >
            {blurb}
          </p>

          <div className="mt-6 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className={cn(
                  "text-[11px] uppercase tracking-wider2 px-3 py-1 rounded-full border",
                  tone === "dark"
                    ? "border-paper/15 text-paper/70"
                    : "border-ink/15 text-ink/70"
                )}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
