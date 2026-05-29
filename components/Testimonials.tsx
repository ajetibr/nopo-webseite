"use client";

import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { cn } from "@/lib/utils";

type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  accent?: boolean;
};

const testimonials: Testimonial[] = [
  {
    quote:
      "Super kompetente Beratung – es wird nicht um den heißen Brei geredet, sondern es werden Fakten genannt und darauf aufgebaut. Keine falschen Versprechungen oder großes Gerede ohne es einzuhalten. Bomben Jungs, kann ich nur weiterempfehlen!",
    name: "Junes Djebali",
    role: "",
    company: "",
    initials: "JD",
    accent: true
  },
  {
    quote: "Gute Kommunikation und super Arbeit. Sehr empfehlenswert!",
    name: "Max Meintz",
    role: "",
    company: "Darts Universe",
    initials: "MM"
  },
  {
    quote:
      "Ich hatte ein super Fotoshooting mit Fynn und Inga für einen Model-Job. Kann NOPO nur empfehlen.",
    name: "Louis",
    role: "",
    company: "Moonkid",
    initials: "L"
  },
  {
    quote:
      "Eine sehr zuverlässige und freundliche Firma. Leistung und Preis waren top! Kann ich nur empfehlen.",
    name: "Eik",
    role: "",
    company: "Podmoney",
    initials: "E"
  },
  {
    quote:
      "Ein sehr engagiertes, motiviertes junges Team, das mit Leidenschaft und Charisma arbeitet. Es war eine Bereicherung, mit euch zusammenzuarbeiten. Ihr konntet meine Ideen schnell visualisieren und umsetzen. Vielen Dank und viel Erfolg!",
    name: "Natan",
    role: "",
    company: "Heiß & Hungrig",
    initials: "N"
  }
];

export default function Testimonials() {
  return (
    <section
      id="testimonials"
      className="relative z-10 bg-fog py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute -right-32 top-40 h-[480px] w-[480px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-mist mb-6">
              <span className="h-px w-10 bg-ink/30" />
              <span>05 · Nette Worte</span>
            </div>
            <AnimatedText
              as="h2"
              text="Was unsere Partner sagen, nachdem die Projekte live sind."
              className="font-display font-bold tracking-tightest leading-[0.95] text-[clamp(36px,6vw,84px)] text-ink text-balance max-w-4xl"
            />
          </div>
          <div className="flex items-center gap-2 text-ink/70 text-sm">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-accent stroke-accent" />
              ))}
            </div>
            <span className="font-medium">5.0</span>
            <span className="text-mist">Schnitt aus 47 gemeinsamen Projekten</span>
          </div>
        </div>

        {/* Asymmetric masonry-like grid */}
        <div className="grid grid-cols-1 md:grid-cols-6 gap-5">
          {testimonials.map((t, i) => (
            <TestimonialCard
              key={t.name}
              t={t}
              index={i}
              className={cn(
                i === 0 && "md:col-span-4 md:row-span-2",
                i === 1 && "md:col-span-2",
                i === 2 && "md:col-span-2",
                i === 3 && "md:col-span-3",
                i === 4 && "md:col-span-3"
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({
  t,
  index,
  className
}: {
  t: Testimonial;
  index: number;
  className?: string;
}) {
  return (
    <motion.figure
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 0.9, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -4 }}
      className={cn(
        "group relative rounded-4xl bg-paper p-8 md:p-10 flex flex-col justify-between gap-10 shadow-[0_1px_0_rgba(26,26,26,0.04)] hover:shadow-floaty transition-shadow duration-500",
        t.accent && "bg-ink text-paper",
        className
      )}
    >
      <Quote
        className={cn(
          "h-8 w-8 shrink-0 -ml-1",
          t.accent ? "text-accent" : "text-accent"
        )}
        strokeWidth={1.5}
      />

      <blockquote
        className={cn(
          "font-display font-medium tracking-tight leading-[1.15] text-balance",
          t.accent
            ? "text-paper text-[clamp(22px,2.3vw,38px)]"
            : "text-ink text-[clamp(18px,1.7vw,26px)]"
        )}
      >
        <span dangerouslySetInnerHTML={{ __html: `&ldquo;${t.quote}&rdquo;` }} />
      </blockquote>

      <figcaption className="flex items-center gap-4">
        <span
          className={cn(
            "inline-flex h-11 w-11 items-center justify-center rounded-full font-display font-bold text-sm shrink-0",
            t.accent ? "bg-accent text-ink" : "bg-ink text-paper"
          )}
        >
          {t.initials}
        </span>
        <div className="min-w-0">
          <div
            className={cn(
              "font-medium text-sm truncate",
              t.accent ? "text-paper" : "text-ink"
            )}
          >
            {t.name}
          </div>
          {[t.role, t.company].filter(Boolean).length > 0 && (
            <div
              className={cn(
                "text-xs truncate",
                t.accent ? "text-paper/60" : "text-ink/55"
              )}
            >
              {[t.role, t.company].filter(Boolean).join(" · ")}
            </div>
          )}
        </div>
      </figcaption>
    </motion.figure>
  );
}
