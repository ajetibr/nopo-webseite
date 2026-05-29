"use client";

import { motion } from "framer-motion";
import AnimatedText from "./AnimatedText";
import MagneticButton from "./MagneticButton";
import { ArrowUpRight } from "lucide-react";

const principles = [
  {
    n: "01",
    t: "Fusion",
    d: "Die Kombination aus verschiedenen Fachbereichen ist für uns der Schlüssel zu nachhaltigeren und wirkungsvolleren Ergebnissen."
  },
  {
    n: "02",
    t: "Authentizität",
    d: "Authentizität endet nicht bei Social Media – sie ist im direkten Miteinander genauso wichtig."
  },
  {
    n: "03",
    t: "Kreativität",
    d: "Kreativität ist für uns mehr als nur eine Idee – sie ist ein Prozess, den wir gemeinsam mit unseren Kunden gestalten."
  },
  {
    n: "04",
    t: "Entwicklung",
    d: "Stillstand ist keine Option. Wir suchen ständig nach neuen Möglichkeiten, uns weiterzuentwickeln und unser Wissen zu erweitern."
  }
];

export default function About() {
  return (
    <section id="about" className="relative z-10 bg-paper py-32 md:py-44 overflow-hidden">
      {/* Decorative orb */}
      <div className="absolute -right-40 top-1/3 h-[500px] w-[500px] rounded-full bg-accent/30 blur-3xl" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Left: editorial story */}
          <div className="lg:col-span-7">
            <div className="flex items-center gap-3 text-xs uppercase tracking-wider2 text-mist mb-6">
              <span className="h-px w-10 bg-ink/30" />
              <span>06 · Über uns</span>
            </div>

            <AnimatedText
              as="h2"
              text="Mit NOPO Media überall sichtbar"
              className="font-display font-bold tracking-tightest leading-[0.95] text-[clamp(36px,5.4vw,72px)] text-ink text-balance"
            />

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1, delay: 0.2 }}
              className="mt-10 space-y-6 text-ink/70 font-light leading-relaxed max-w-2xl text-pretty"
            >
              <p className="text-lg">
                Unsere Reise begann in einer besonderen Zeit – mitten in der
                Corona-Pandemie. Wir nutzten die gewonnene Zeit und eröffneten ein
                <em className="font-display not-italic font-medium text-ink"> Tonstudio </em>
                für Artists, Producer und Podcaster. Nach unzähligen Projekten und einer
                vielversprechenden Zusammenarbeit haben wir uns entschieden, den nächsten
                unternehmerischen Schritt zu gehen. Seit 2019 sind wir ein eingespieltes
                Duo – mit tiefer Leidenschaft für die Medienwelt, einem starken Netzwerk
                und Erfahrung in Social Media, Marketing und kreativen Prozessen, die wir
                in jedes NOPO-Projekt einbringen.
              </p>
              <p>
                Warum Kiel? Warum Schleswig-Holstein? Als gebürtige Kieler wollen wir
                nicht nur Unternehmen, sondern auch den Standort attraktiver machen. Der
                Norden ist eine aufstrebende Region voller einzigartiger Geschichten.
                Unser Ziel: Menschen dabei helfen, ihre Geschichten authentisch zu
                erzählen und ihre Visionen zu verwirklichen – mit einem hohen
                Qualitätsanspruch, der unsere eigenen und die Erwartungen unserer Kunden
                übertrifft.
              </p>
            </motion.div>

            <div className="mt-12">
              <MagneticButton
                as="a"
                href="#contact"
                className="group inline-flex items-center gap-3 rounded-full bg-ink text-paper pl-6 pr-3 py-3.5 text-[15px] font-medium"
              >
                <span>Lass schnacken</span>
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-accent text-ink transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight className="h-4 w-4" strokeWidth={2.5} />
                </span>
              </MagneticButton>
            </div>
          </div>

          {/* Right: principles list */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 1 }}
              className="rounded-4xl glass-strong p-2 shadow-floaty"
            >
              <div className="rounded-[28px] bg-paper p-8 md:p-10">
                <div className="text-xs uppercase tracking-wider2 text-mist mb-8">
                  Das ist uns wichtig
                </div>
                <ul className="divide-y divide-ink/10">
                  {principles.map((p, i) => (
                    <motion.li
                      key={p.n}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: "-5%" }}
                      transition={{ duration: 0.7, delay: i * 0.1 }}
                      className="group py-6 first:pt-0 last:pb-0 flex items-start gap-6 cursor-default"
                    >
                      <span className="font-display text-mist text-sm pt-1">
                        {p.n}
                      </span>
                      <div>
                        <h4 className="font-display font-bold text-ink text-xl md:text-2xl tracking-tight transition-transform duration-500 group-hover:-translate-y-0.5">
                          {p.t}
                        </h4>
                        <p className="mt-1.5 text-ink/60 text-sm font-light">
                          {p.d}
                        </p>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>

            {/* Marquee */}
            <div className="mt-10 overflow-hidden rounded-full glass-strong py-4">
              <div className="flex w-max animate-marquee gap-12 text-mist font-display font-medium uppercase tracking-wider2 text-sm whitespace-nowrap">
                {Array.from({ length: 2 }).map((_, n) => (
                  <div key={n} className="flex gap-12">
                    {[
                      "Social Media",
                      "•",
                      "Websites",
                      "•",
                      "SEO & GEO",
                      "•",
                      "Ads",
                      "•",
                      "Video",
                      "•",
                      "Foto",
                      "•",
                      "Strategie",
                      "•",
                      "Content",
                      "•"
                    ].map((w, i) => (
                      <span key={`${n}-${i}`}>{w}</span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
