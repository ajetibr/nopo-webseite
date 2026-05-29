"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import AnimatedText from "./AnimatedText";
import ClientLogos from "./ClientLogos";

type Project = {
  title: string;
  client: string;
  category: string;
  year: string;
  size: "wide" | "tall" | "square";
  // Asset-ready slots — provide image, video, or gradient as a graceful fallback
  image?: string;
  video?: string;
  poster?: string;
  gradient?: string;
};

const projects: Project[] = [
  {
    title: "Paramount+ – Gamescom",
    client: "Paramount+",
    category: "Social Content · Aftermovie",
    year: "2025",
    size: "wide",
    gradient: "from-[#1a1a1a] via-[#2a3e48] to-[#5BC5E6]"
  },
  {
    title: "Heiß & Hungrig",
    client: "Heiß & Hungrig",
    category: "Kanalkonzeption",
    year: "2026",
    size: "tall",
    gradient: "from-[#5BC5E6] via-[#cfeff9] to-[#ffffff]"
  },
  {
    title: "PDC",
    client: "PDC",
    category: "Social Content · Post Production",
    year: "2025",
    size: "tall",
    gradient: "from-[#f4f4f5] via-[#a0a0a0] to-[#1a1a1a]"
  },
  {
    title: "Cinemare Meeresfilmfestival",
    client: "Cinemare",
    category: "Webdesign",
    year: "2024",
    size: "wide",
    gradient: "from-[#cfeff9] via-[#5BC5E6] to-[#1a1a1a]"
  },
  {
    title: "Holstein Kiel Jubiläum mit Budenzauber",
    client: "Holstein Kiel",
    category: "Aftermovie",
    year: "2025",
    size: "square",
    gradient: "from-[#1a1a1a] via-[#5BC5E6] to-[#cfeff9]"
  },
  {
    title: "Atelier Events",
    client: "Atelier Events",
    category: "Webdesign · SEO",
    year: "2026",
    size: "square",
    gradient: "from-[#ffffff] via-[#ededed] to-[#1a1a1a]"
  }
];

export default function Portfolio() {
  return (
    <section
      id="portfolio"
      className="relative z-10 bg-ink text-paper py-28 md:py-36 overflow-hidden"
    >
      {/* Header */}
      <div className="mx-auto max-w-[1400px] w-full px-6 lg:px-12">
        <div className="flex items-end justify-between gap-8 flex-wrap mb-16 md:mb-20">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-paper/40 mb-6">
              <span className="h-px w-10 bg-paper/30" />
              <span>04 · Ausgewählte Projekte</span>
            </div>
            <AnimatedText
              as="h2"
              text="Ein paar echte Highlights."
              className="font-display font-bold tracking-tightest leading-[0.95] text-[clamp(36px,6vw,84px)] text-paper"
            />
          </div>
          <p className="max-w-sm text-paper/55 font-light leading-relaxed">
            Ein kleiner Einblick in unsere jüngsten Arbeiten.
          </p>
        </div>

        {/* Grid — fully visible, asymmetric, no horizontal scroll */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8 auto-rows-[minmax(280px,_auto)]">
          {projects.map((p, i) => (
            <ProjectCard key={p.title} project={p} index={i} />
          ))}
        </div>

        {/* View archive CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.9 }}
          className="mt-16 flex justify-center"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-4 rounded-full border border-paper/15 hover:border-paper/40 px-8 py-5 text-paper/80 hover:text-paper transition-colors"
          >
            <span className="font-display text-xl md:text-2xl">Ab ins Archiv</span>
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45">
              <ArrowUpRight className="h-5 w-5" strokeWidth={2.5} />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Embedded dark logobar */}
      <div className="relative mt-24 md:mt-32 border-t border-paper/10 pt-16">
        <ClientLogos variant="dark" eyebrow="In guter Gesellschaft · Partner & Kunden" />
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hover, setHover] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleEnter = () => {
    setHover(true);
    if (videoRef.current) videoRef.current.play().catch(() => {});
  };
  const handleLeave = () => {
    setHover(false);
    const v = videoRef.current;
    if (v) {
      v.pause();
      v.currentTime = 0;
    }
  };

  // Span / aspect tuned for full-card visibility — never overlap, never crop
  const sizeClasses = {
    wide: "md:col-span-7 aspect-[16/10]",
    tall: "md:col-span-5 aspect-[4/5]",
    square: "md:col-span-6 aspect-[5/4]"
  }[project.size];

  return (
    <motion.figure
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{
        duration: 1,
        delay: (index % 2) * 0.08,
        ease: [0.16, 1, 0.3, 1]
      }}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className={cn(
        "group relative col-span-1 overflow-hidden rounded-4xl md:rounded-5xl bg-[#0e0e0e] cursor-pointer",
        sizeClasses
      )}
    >
      {/* Media layer — video → image → gradient fallback */}
      <motion.div
        animate={{ scale: hover ? 1.06 : 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {project.video ? (
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src={project.video}
            poster={project.poster}
            muted
            loop
            playsInline
            preload="metadata"
          />
        ) : project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div
            className={cn(
              "absolute inset-0 bg-gradient-to-br",
              project.gradient || "from-ink via-ink to-accent"
            )}
          />
        )}
      </motion.div>

      {/* Grade overlay */}
      <motion.div
        animate={{ opacity: hover ? 0.5 : 0.3 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0 pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.4), transparent 60%), radial-gradient(circle at 70% 70%, rgba(0,0,0,0.5), transparent 60%)"
        }}
      />
      <div className="grain pointer-events-none" />

      {/* Bottom veil */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink via-ink/40 to-transparent pointer-events-none" />

      {/* Index */}
      <div className="absolute top-6 left-6 md:top-7 md:left-8 font-display text-paper/85 text-sm tracking-wider2 z-10">
        / {String(index + 1).padStart(2, "0")}
      </div>

      {/* Top-right arrow chip */}
      <div className="absolute top-6 right-6 md:top-7 md:right-7 z-10">
        <motion.span
          animate={{ rotate: hover ? 45 : 0 }}
          transition={{ type: "spring", stiffness: 250, damping: 20 }}
          className="inline-flex h-10 w-10 items-center justify-center rounded-full glass text-ink"
        >
          <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
        </motion.span>
      </div>

      {/* Caption */}
      <div className="absolute inset-x-6 md:inset-x-9 bottom-6 md:bottom-8 flex items-end justify-between gap-6 z-10">
        <div>
          <div className="text-[11px] uppercase tracking-wider2 text-paper/70 mb-2">
            {project.category} · {project.year}
          </div>
          <h3 className="font-display font-bold text-paper text-[clamp(22px,2.4vw,40px)] leading-tight tracking-tightest max-w-md">
            {project.title}
          </h3>
        </div>

        {/* Hover-reveal "View" pill */}
        <motion.span
          initial={false}
          animate={{
            y: hover ? 0 : 24,
            opacity: hover ? 1 : 0
          }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="hidden md:inline-flex items-center gap-2 rounded-full bg-accent text-ink px-4 py-2 text-xs font-medium uppercase tracking-wider2 shrink-0"
        >
          Projekt ansehen
          <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </motion.span>
      </div>
    </motion.figure>
  );
}
