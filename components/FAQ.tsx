"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

const items: Item[] = [
  {
    q: "Wie viel Zeit muss ich für das Projekt einplanen?",
    a: "So viel, wie du möchtest. Unsere Zusammenarbeit läuft komplett stressfrei. Nach dem ersten Kennenlernen übernehmen wir das Ruder. Du musst also keine stundenlangen Meetings einplanen – wir halten dich einfach unkompliziert auf dem Laufenden, während du dich entspannt um dein Business kümmerst."
  },
  {
    q: "Was kostet die Zusammenarbeit mit euch?",
    a: "Bei uns gibt es keine versteckten Kosten oder bösen Überraschungen am Ende. Nach unserem ersten Gespräch werfen wir einen Blick auf deine Kanäle, und du bekommst ein transparentes, unverbindliches Angebot mit einer klaren Aufwandsschätzung. So weißt du von Tag eins an genau, woran du bist."
  },
  {
    q: "Könnt ihr auch bestehende Websites oder SEO-Strategien optimieren?",
    a: "Absolut. Wir müssen das Rad nicht immer neu erfinden. Wenn du schon eine Website hast, die aber nicht richtig performt, oder dein Google-Ranking einen Schubs braucht, klinken wir uns genau da ein. Wir analysieren den Ist-Zustand und drehen an den Stellschrauben, die dich wirklich weiterbringen."
  },
  {
    q: "Betreut ihr die Projekte auch nach dem Live-Gang weiter?",
    a: "Na klar, wir lassen dich danach nicht im Regen stehen. Wir übergeben dir alle Ergebnisse so, dass dein Team im Alltag super einfach damit arbeiten kann. Und wenn du danach Unterstützung beim Content, bei Social Ads oder der Wartung brauchst, sind wir weiterhin als feste Partner an deiner Seite."
  },
  {
    q: "Wer arbeitet konkret an meinem Projekt?",
    a: "Bei uns gibt es kein anonymes Agentur-Chaos. Hinter NOPO stehen wir – Ajet und Noel. Du hast also immer den direkten Draht zu den Leuten, die dein Projekt auch tatsächlich umsetzen. Wir teilen uns die Aufgaben je nach Skills genau so auf, dass das beste Ergebnis für dich herauskommt."
  }
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="relative z-10 bg-fog py-24 md:py-32 overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-mist mb-6">
              <span className="h-px w-10 bg-ink/30" />
              <span>08 · FAQ</span>
            </div>
            <h2 className="font-display font-bold tracking-tightest leading-[0.95] text-[clamp(36px,4.8vw,60px)] text-ink text-balance">
              Fragen, die wir <span className="italic font-medium">oft</span> hören.
            </h2>
            <p className="mt-6 text-ink/60 font-light leading-relaxed max-w-sm">
              Frage nicht dabei? Kurze Mail an uns und wir ergänzen sie.
            </p>
          </div>

          <ul className="lg:col-span-8 divide-y divide-ink/10 border-y border-ink/10">
            {items.map((it, i) => {
              const isOpen = open === i;
              return (
                <li key={it.q} className="group">
                  <button
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="w-full text-left flex items-start justify-between gap-8 py-7 md:py-9"
                  >
                    <span
                      className={cn(
                        "font-display font-bold tracking-tight text-xl md:text-3xl leading-tight transition-colors duration-500 text-pretty",
                        isOpen ? "text-ink" : "text-ink/80 group-hover:text-ink"
                      )}
                    >
                      {it.q}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 250, damping: 22 }}
                      className={cn(
                        "shrink-0 inline-flex h-11 w-11 items-center justify-center rounded-full transition-colors duration-500",
                        isOpen
                          ? "bg-accent text-ink"
                          : "bg-ink/[0.06] text-ink group-hover:bg-ink group-hover:text-paper"
                      )}
                    >
                      <Plus className="h-4 w-4" strokeWidth={2.5} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        key="a"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <p
                          className="pb-8 md:pb-10 pr-16 md:pr-24 text-ink/65 font-light leading-relaxed text-pretty max-w-2xl"
                          dangerouslySetInnerHTML={{ __html: it.a }}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
