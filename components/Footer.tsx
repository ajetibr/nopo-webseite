"use client";

import { motion } from "framer-motion";
import MagneticButton from "./MagneticButton";
import BASE_PATH from "@/lib/basePath";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative z-10 bg-ink text-paper overflow-hidden"
    >
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-[480px] w-[680px] rounded-full bg-accent/30 blur-3xl pointer-events-none" />
      <div className="grain opacity-[0.06]" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12 pt-28 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-end">
          <div className="md:col-span-8">
            <div className="text-xs uppercase tracking-wider2 text-paper/50 mb-8">
              Lass uns was bauen
            </div>
            <h2 className="font-display font-black tracking-tightest leading-[0.92] text-[clamp(40px,6vw,104px)]">
              <span className="block">Idee schon im Kopf?</span>
              <span className="block">
                Lass mal <span className="italic font-medium text-accent">sehen</span>.
              </span>
            </h2>
          </div>
          <div className="md:col-span-4 flex md:justify-end">
            <MagneticButton
              as="a"
              href="mailto:hello@nopo.studio"
              strength={32}
              className="group inline-flex h-40 w-40 md:h-52 md:w-52 items-center justify-center rounded-full bg-accent text-ink font-display font-bold text-base md:text-lg shadow-floaty"
            >
              <span className="flex flex-col items-center gap-1.5 text-center px-4">
                Neues Projekt starten
                <ArrowUpRight className="h-5 w-5 transition-transform duration-500 group-hover:rotate-45" strokeWidth={2.5} />
              </span>
            </MagneticButton>
          </div>
        </div>

        <div className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-10 border-t border-paper/10 pt-12">
          <FooterCol
            title="Studio"
            items={[
              { l: "Über uns", h: "#about" },
              { l: "Services", h: "#services" },
              { l: "Projekte", h: "#portfolio" },
              { l: "FAQ", h: "#faq" }
            ]}
          />
          <FooterCol
            title="Kontakt"
            items={[
              { l: "hello@nopo.studio", h: "mailto:hello@nopo.studio" },
              { l: "Kiel · Norddeutschland", h: "#" }
            ]}
          />
          <FooterCol
            title="Social"
            items={[
              { l: "Instagram", h: "#" },
              { l: "TikTok", h: "#" },
              { l: "LinkedIn", h: "#" }
            ]}
          />
          <FooterCol
            title="Rechtliches"
            items={[
              { l: "Impressum", h: "#" },
              { l: "Datenschutz", h: "#" },
              { l: "Cookies", h: "#" }
            ]}
          />
        </div>

        <div className="mt-20 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-t border-paper/10 pt-8 text-xs text-paper/50">
          <div className="leading-none">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`${BASE_PATH}/logo-white.png`}
              alt="NOPO Logo"
              className="h-20 md:h-32 w-auto object-contain"
            />
          </div>
          <div className="flex flex-col md:items-end gap-2 md:gap-1">
            <div>© 2026 NOPO Studio. Alle Rechte vorbehalten.</div>
            <div className="uppercase tracking-wider2">
              Made in Kiel · Norddeutschland
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items
}: {
  title: string;
  items: { l: string; h: string }[];
}) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-wider2 text-paper/40 mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((it) => (
          <li key={it.l}>
            <motion.a
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              href={it.h}
              className="inline-flex items-center text-paper/85 hover:text-accent transition-colors text-sm"
            >
              {it.l}
            </motion.a>
          </li>
        ))}
      </ul>
    </div>
  );
}
