"use client";

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { Linkedin, Mail, ArrowUpRight } from "lucide-react";
import BASE_PATH from "@/lib/basePath";
import AnimatedText from "./AnimatedText";
import { cn } from "@/lib/utils";

type Director = {
  name: string;
  role: string;
  initials: string;
  quote: string;
  email: string;
  linkedin: string;
  image?: string;
  // Decorative fallback gradient for the asset slot
  gradient: string;
};

const directors: Director[] = [
  {
    name: "Ajet Ibrahimi",
    role: "Managing Director · Creative",
    initials: "AI",
    quote:
      "Every project is a chance to ship one detail no one has seen before. We are unreasonable about that.",
    email: "ajet@nopo.studio",
    linkedin: "https://linkedin.com/in/ajetibrahimi",
    image: `${BASE_PATH}/ajet-ibrahimi.webp`,
    gradient: "from-[#1a1a1a] via-[#2a3e48] to-[#5BC5E6]"
  },
  {
    name: "Noel Vuylsteke",
    role: "Managing Director · Strategy",
    initials: "NV",
    quote:
      "Strategy without craft is a slide deck. Craft without strategy is a moodboard. We refuse to choose.",
    email: "noel@nopo.studio",
    linkedin: "https://linkedin.com/in/noelvuylsteke",
    image: `${BASE_PATH}/noel-vuylsteke.webp`,
    gradient: "from-[#5BC5E6] via-[#cfeff9] to-[#1a1a1a]"
  }
];

export default function Leadership() {
  return (
    <section
      id="leadership"
      className="relative z-10 bg-paper py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full bg-accent/20 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-mist mb-6">
              <span className="h-px w-10 bg-ink/30" />
              <span>07 · Leadership</span>
            </div>
            <AnimatedText
              as="h2"
              text="The two humans on the hook."
              className="font-display font-bold tracking-tightest leading-[0.95] text-[clamp(36px,6vw,84px)] text-ink text-balance max-w-4xl"
            />
          </div>
          <p className="max-w-sm text-ink/60 font-light leading-relaxed">
            NOPO is co-led by Ajet and Noel. Between them, twenty years of shipping
            work that outlives the brief.
          </p>
        </div>

        {/* Asymmetric split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
          <DirectorCard
            d={directors[0]}
            className="lg:col-span-7 lg:row-span-2 aspect-[4/5] lg:aspect-auto lg:min-h-[640px]"
          />
          <DirectorCard
            d={directors[1]}
            className="lg:col-span-5 lg:row-span-2 aspect-[4/5] lg:aspect-auto lg:min-h-[640px] lg:mt-24"
          />
        </div>
      </div>
    </section>
  );
}

function DirectorCard({
  d,
  className
}: {
  d: Director;
  className?: string;
}) {
  const [hover, setHover] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-10%" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn(
        "group relative overflow-hidden rounded-5xl md:rounded-6xl bg-[#0e0e0e] text-paper cursor-pointer",
        className
      )}
    >
      {/* Image slot — falls back to gradient */}
      <motion.div
        animate={{ scale: hover ? 1.06 : 1 }}
        transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1] }}
        className="absolute inset-0"
      >
        {d.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={d.image}
            alt={d.name}
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          <div className={cn("absolute inset-0 bg-gradient-to-br", d.gradient)} />
        )}
      </motion.div>

      {/* Grade overlay */}
      <div
        className="absolute inset-0 mix-blend-overlay pointer-events-none opacity-40"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.45), transparent 60%), radial-gradient(circle at 75% 80%, rgba(0,0,0,0.5), transparent 60%)"
        }}
      />
      <div className="grain pointer-events-none" />

      {/* Bottom ink veil */}
      <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-ink/85 via-ink/40 to-transparent pointer-events-none" />

      {/* Initials chip (top-left) */}
      <div className="absolute top-7 left-7 z-10 inline-flex h-12 w-12 items-center justify-center rounded-full bg-paper text-ink font-display font-bold text-sm">
        {d.initials}
      </div>

      {/* Socials chip (top-right) */}
      <div className="absolute top-7 right-7 z-10 flex items-center gap-2">
        <SocialButton href={d.linkedin} label="LinkedIn">
          <Linkedin className="h-3.5 w-3.5" strokeWidth={2} />
        </SocialButton>
        <SocialButton href={`mailto:${d.email}`} label="Email">
          <Mail className="h-3.5 w-3.5" strokeWidth={2} />
        </SocialButton>
      </div>

      {/* Footer caption */}
      <figcaption className="absolute inset-x-7 bottom-7 md:inset-x-10 md:bottom-10 z-10">
        <div className="flex items-end justify-between gap-6">
          <div>
            <div className="text-[11px] uppercase tracking-wider2 text-paper/70 mb-2">
              {d.role}
            </div>
            <h3 className="font-display font-bold text-paper text-[clamp(28px,3vw,48px)] leading-[1] tracking-tightest">
              {d.name}
            </h3>
          </div>
          <motion.span
            animate={{ rotate: hover ? 45 : 0 }}
            transition={{ type: "spring", stiffness: 250, damping: 20 }}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-ink shrink-0"
          >
            <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
          </motion.span>
        </div>

        {/* Hover-reveal quote */}
        <motion.div
          initial={false}
          animate={{
            height: hover ? "auto" : 0,
            opacity: hover ? 1 : 0,
            marginTop: hover ? 20 : 0
          }}
          transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden"
        >
          <p className="max-w-md font-display font-medium italic text-paper text-base md:text-lg leading-snug text-pretty">
            &ldquo;{d.quote}&rdquo;
          </p>
        </motion.div>
      </figcaption>
    </motion.figure>
  );
}

function SocialButton({
  href,
  label,
  children
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <motion.a
      href={href}
      aria-label={label}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 350, damping: 18 }}
      className="inline-flex h-9 w-9 items-center justify-center rounded-full glass-strong text-ink hover:bg-accent transition-colors"
    >
      {children}
    </motion.a>
  );
}
