"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Search, Compass, PenTool, Code2 } from "lucide-react";
import AnimatedText from "./AnimatedText";
import { cn } from "@/lib/utils";

type Step = {
  n: string;
  title: string;
  duration: string;
  blurb: string;
  activities: string[];
  deliverables: string[];
  icon: React.ElementType;
};

const steps: Step[] = [
  {
    n: "01",
    title: "Kennenlernen",
    duration: "",
    icon: Search,
    blurb:
      "Wir schnacken ganz unkompliziert über deine aktuelle Lage, deine Ziele und wo der Schuh gerade drückt. So finden wir ohne langes Drumherum genau den Hebel, der dich wirklich weiterbringt.",
    activities: [
      "Erstes Kennenlernen & Vibe-Check",
      "Bestandsaufnahme deiner aktuellen Lage",
      "Grobe Potenzial- und Zielanalyse"
    ],
    deliverables: [
      "Klarer Fahrplan",
      "Erstes unverbindliches Angebot",
      "Transparente Aufwandseinschätzung"
    ]
  },
  {
    n: "02",
    title: "Strategie & Konzept",
    duration: "",
    icon: Compass,
    blurb:
      "Jetzt wird aus deinen Zielen ein klarer Plan. Wir legen fest, welche Kanäle, Inhalte und Maßnahmen dich wirklich nach vorne bringen – und in welcher Reihenfolge. Du bekommst eine Strategie, die nicht in der Schublade landet, sondern Woche für Woche umgesetzt wird.",
    activities: [
      "Strategie & Kanalauswahl passend zu deinen Zielen",
      "Kreativ- und Content-Konzept",
      "Konkreter Maßnahmen- und Zeitplan"
    ],
    deliverables: [
      "Klare Strategie auf den Punkt",
      "Roter Faden für alle Inhalte",
      "Verbindlicher Fahrplan für die Umsetzung"
    ]
  },
  {
    n: "03",
    title: "Produktion & Umsetzung",
    duration: "",
    icon: PenTool,
    blurb:
      "Jetzt geht's ans Eingemachte: Wir produzieren, gestalten und bauen. Ob Website, Foto- und Videocontent oder Kampagnen – wir setzen das Konzept Schritt für Schritt um und halten dich dabei locker auf dem Laufenden, ohne dich mit Details zu überfrachten.",
    activities: [
      "Produktion von Content, Design & Website",
      "Umsetzung der geplanten Maßnahmen",
      "Laufende Abstimmung in kurzen Feedback-Schleifen"
    ],
    deliverables: [
      "Fertige Inhalte, einsatzbereit für deine Kanäle",
      "Regelmäßige Updates ohne Meeting-Marathon",
      "Ergebnisse, die sitzen"
    ]
  },
  {
    n: "04",
    title: "Launch & Optimierung",
    duration: "",
    icon: Code2,
    blurb:
      "Wenn alles steht, gehen wir live – und bleiben dran. Wir beobachten, was funktioniert, drehen an den richtigen Stellschrauben und holen Schritt für Schritt mehr aus deinen Kanälen heraus. Nach dem Launch lassen wir dich nicht allein, sondern begleiten dich als feste Partner weiter.",
    activities: [
      "Go-live und sauberer Übergang",
      "Auswertung der ersten Ergebnisse",
      "Laufende Optimierung von Reichweite & Performance"
    ],
    deliverables: [
      "Ein erfolgreicher Launch",
      "Transparente Reportings",
      "Ein Partner, der auch danach an deiner Seite bleibt"
    ]
  }
];

export default function Process() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="process"
      className="relative z-10 bg-fog py-32 md:py-44 overflow-hidden"
    >
      <div className="absolute -left-32 top-1/3 h-[480px] w-[480px] rounded-full bg-accent/25 blur-3xl pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-20">
          <div>
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-mist mb-6">
              <span className="h-px w-10 bg-ink/30" />
              <span>03 · Unser Workflow</span>
            </div>
            <AnimatedText
              as="h2"
              text="Klarer Plan. Null Stress."
              className="font-display font-bold tracking-tightest leading-[0.95] text-[clamp(36px,6vw,84px)] text-ink"
            />
          </div>
          <p className="max-w-sm text-ink/60 font-light leading-relaxed">
            Jedes gemeinsame Projekt durchläuft die gleichen vier Meilensteine –
            angepasst an dein Tempo, aber kompromisslos in der Umsetzung.
          </p>
        </div>

        <div className="rounded-4xl md:rounded-5xl bg-paper p-3 md:p-4 shadow-soft">
          <ul>
            {steps.map((s, i) => {
              const isActive = active === i;
              return (
                <li
                  key={s.n}
                  className={cn(
                    "group relative rounded-3xl md:rounded-4xl overflow-hidden transition-colors duration-500",
                    isActive ? "bg-ink text-paper" : "hover:bg-fog text-ink"
                  )}
                >
                  <button
                    onClick={() => setActive(isActive ? -1 : i)}
                    onMouseEnter={() => setActive(i)}
                    className="w-full text-left flex items-center gap-6 md:gap-10 px-6 md:px-10 py-7 md:py-9"
                  >
                    <span
                      className={cn(
                        "font-display text-sm md:text-base shrink-0 transition-colors duration-500",
                        isActive ? "text-accent" : "text-mist"
                      )}
                    >
                      {s.n}
                    </span>

                    <span className="flex items-center gap-4 md:gap-6 flex-1 min-w-0">
                      <span
                        className={cn(
                          "inline-flex h-11 w-11 md:h-12 md:w-12 items-center justify-center rounded-2xl shrink-0 transition-colors duration-500",
                          isActive
                            ? "bg-accent text-ink"
                            : "bg-ink/[0.06] text-ink group-hover:bg-ink group-hover:text-paper"
                        )}
                      >
                        <s.icon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <span className="font-display font-bold tracking-tightest text-[clamp(24px,3.4vw,44px)] leading-none truncate">
                        {s.title}
                      </span>
                    </span>

                    {s.duration && (
                      <span
                        className={cn(
                          "hidden md:inline-block text-xs uppercase tracking-wider2 shrink-0 transition-colors duration-500",
                          isActive ? "text-paper/60" : "text-mist"
                        )}
                      >
                        {s.duration}
                      </span>
                    )}

                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ type: "spring", stiffness: 250, damping: 20 }}
                      className={cn(
                        "inline-flex h-10 w-10 items-center justify-center rounded-full shrink-0 transition-colors duration-500",
                        isActive
                          ? "bg-paper text-ink"
                          : "bg-ink/[0.06] text-ink"
                      )}
                    >
                      <svg
                        viewBox="0 0 24 24"
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth={2.5}
                      >
                        <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                      </svg>
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        key="content"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 md:px-10 pb-8 md:pb-10 grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-10">
                          <p className="md:col-span-5 md:col-start-2 text-paper/75 font-light leading-relaxed text-pretty text-[15px] md:text-base">
                            {s.blurb}
                          </p>

                          <div className="md:col-span-3">
                            <div className="text-[10px] uppercase tracking-wider2 text-paper/40 mb-3">
                              Das machen wir
                            </div>
                            <ul className="space-y-2.5">
                              {s.activities.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-3 text-sm text-paper/80"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="md:col-span-3">
                            <div className="text-[10px] uppercase tracking-wider2 text-paper/40 mb-3">
                              Das bekommst du
                            </div>
                            <ul className="space-y-2.5">
                              {s.deliverables.map((b) => (
                                <li
                                  key={b}
                                  className="flex items-start gap-3 text-sm text-paper/80"
                                >
                                  <span className="mt-2 h-1.5 w-1.5 rounded-full bg-paper/50 shrink-0" />
                                  {b}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
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
