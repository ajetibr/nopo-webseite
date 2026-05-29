"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

type Item = { q: string; a: string };

const items: Item[] = [
  {
    q: "What does a typical engagement look like?",
    a: "A typical engagement runs 10–16 weeks across four chapters — Discovery, Strategy, Design, Development. We embed with your team in a single shared channel and meet twice weekly. Most clients keep us on a long-tail retainer afterwards because the work keeps evolving."
  },
  {
    q: "What size of company do you usually work with?",
    a: "About 60% of our work is with Series A–C founders. The rest is split between later-stage product teams that need a brand reset and cultural institutions. We don&apos;t scale up the team for bigger logos — same six humans on every project."
  },
  {
    q: "Do you take equity?",
    a: "Occasionally, for founders we believe in. It&apos;s not the default. The default is a fixed scope of work invoiced in three milestones."
  },
  {
    q: "Can you embed with our existing design team?",
    a: "Yes — and we love it. The most enduring work usually comes from co-creating with a strong in-house team that will carry the system forward long after we&apos;ve gone."
  },
  {
    q: "How do I start a project?",
    a: "Send an email to hello@nopo.studio with a paragraph about your company and what you&apos;re trying to make true. We reply within two business days, even when the answer is no."
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
              Questions we hear, <span className="italic font-medium">often</span>.
            </h2>
            <p className="mt-6 text-ink/60 font-light leading-relaxed max-w-sm">
              Something missing? Email us and we&apos;ll add it. We update this every
              quarter.
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
