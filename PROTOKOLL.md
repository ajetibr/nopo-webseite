# NOPO Webseite — Entwicklungsprotokoll

**Projekt:** NOPO Studio Landingpage  
**Repository:** [github.com/ajetibr/nopo-webseite](https://github.com/ajetibr/nopo-webseite)  
**Deployment:** [ajetibr.github.io/nopo-webseite](https://ajetibr.github.io/nopo-webseite)  
**Stack:** Next.js 14 (App Router) · Tailwind CSS · Framer Motion · TypeScript  
**Erstellt:** Mai 2026

---

## Inhaltsverzeichnis

1. [Projektstruktur](#1-projektstruktur)
2. [Konfigurationsdateien](#2-konfigurationsdateien)
3. [Komponenten im Detail](#3-komponenten-im-detail)
4. [Design-System & Tokens](#4-design-system--tokens)
5. [Assets & Medien](#5-assets--medien)
6. [CI/CD & Deployment](#6-cicd--deployment)
7. [Commit-Historie](#7-commit-historie)
8. [Bekannte Bugfixes](#8-bekannte-bugfixes)
9. [Erweiterungshinweise](#9-erweiterungshinweise)

---

## 1. Projektstruktur

```
C:\NOPO_Landingpage\
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions → GitHub Pages
├── app/
│   ├── globals.css             # Basis-CSS, Glassmorphism-Klassen, Grain-Textur
│   ├── layout.tsx              # Root-Layout, Google Fonts, SmoothScroll-Wrapper
│   └── page.tsx                # Seitenkomposition (alle Sektionen)
├── components/
│   ├── Navigation.tsx          # Floating Pill-Navigation
│   ├── Hero.tsx                # Hero-Sektion mit DynamicFrame
│   ├── Services.tsx            # Bento-Grid Leistungsübersicht
│   ├── Process.tsx             # 4-Schritte-Akkordeon
│   ├── Portfolio.tsx           # Projektgalerie + Logo-Marquee
│   ├── ClientLogos.tsx         # Infiniter Logo-Marquee (hell & dunkel)
│   ├── Testimonials.tsx        # Kundenstimmen-Grid
│   ├── About.tsx               # Studio-Story mit Prinzipien
│   ├── Leadership.tsx          # Geschäftsführer-Sektion
│   ├── FAQ.tsx                 # Akkordeon FAQ
│   ├── Footer.tsx              # Footer mit CTA
│   ├── DynamicFrame.tsx        # Physik-basierter Showreel-Rahmen
│   ├── MagneticButton.tsx      # Magnetischer Hover-Button (wiederverwendbar)
│   ├── AnimatedText.tsx        # Wort-für-Wort Scroll-Reveal
│   └── SmoothScroll.tsx        # Lenis Smooth-Scroll-Wrapper
├── lib/
│   ├── basePath.ts             # NEXT_PUBLIC_BASE_PATH Helper für GitHub Pages
│   └── utils.ts                # cn() — clsx + tailwind-merge
├── public/
│   ├── logo-black.png          # Logo für helle Hintergründe (Navigation)
│   ├── logo-white.png          # Logo für dunkle Hintergründe (Footer, Frame)
│   ├── ajet-ibrahimi.webp      # Foto Geschäftsführer Ajet Ibrahimi
│   └── noel-vuylsteke.webp     # Foto Geschäftsführer Noel Vuylsteke
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── tsconfig.json
└── package.json
```

---

## 2. Konfigurationsdateien

### `next.config.mjs`
- `output: "export"` → statischer HTML-Export für GitHub Pages
- `basePath` + `assetPrefix` aus `NEXT_PUBLIC_BASE_PATH` Env-Variable  
  (leer lokal, `/nopo-webseite` im GitHub-Actions-Build)
- `images.unoptimized: true` → Pflicht bei statischem Export

### `tailwind.config.ts`
Vollständig erweitertes Theme:

| Token | Wert | Verwendung |
|---|---|---|
| `ink` | `#1a1a1a` | Primärtext, dunkle Sektionen |
| `paper` | `#ffffff` | Hintergründe, helle Sektionen |
| `mist` | `#a0a0a0` | Sekundärtext, Platzhalter |
| `fog` | `#f4f4f5` | Sanfte Hintergrundflächen |
| `accent` | `#5BC5E6` | CTA, Highlights, aktive Zustände |
| `accent.soft` | `#cfeff9` | Sanfte Akzentflächen |
| `font-display` | Montserrat (700–900) | Headlines, Wordmarks |
| `font-sans` | Inter (300–600) | Fließtext, UI |
| `rounded-4xl` – `6xl` | 2rem – 3rem | Karten, Container |
| `shadow-floaty` | Mehrschichtiger Schatten | schwebende Elemente |
| `animate-marquee` | 40s linear infinite | Logo-Laufband |
| `animate-floaty` | 6s ease-in-out infinite | Orb-Dekorationen |

### `app/globals.css`
- Lenis-Kompatibilitäts-Regeln (`html.lenis`, `lenis-smooth`)
- `.glass` / `.glass-strong` — Glassmorphism-Utilities  
  (`backdrop-filter: blur`, halbtransparentes Weiß, subtile Border)
- `.grain` — SVG-Noise-Textur als Pseudo-Overlay (Opacity 4–7 %)
- `.no-scrollbar` — scrollbar-Ausblendung für horizontale Tracks
- Custom Scrollbar (8 px, rounded, `rgba(26,26,26,0.18)`)
- `::selection` in Akzentfarbe Cyan

---

## 3. Komponenten im Detail

### `Navigation.tsx` — Floating Pill-Navigation
- Fixiert oben, `z-[60]`, startet außerhalb des Viewports und fährt ein
- Glassmorphism-Pille (`glass-strong`) schrumpft beim Scrollen via `useTransform`  
  (Breite: 960 px → 720 px, Padding reduziert)
- **Hover-Glide-Pill**: `layoutId="nav-pill"` gleitet mit Spring-Physik  
  (`stiffness: 380, damping: 30, mass: 0.6`) zum gerade gehoverten Item
- Aktiver Zustand: separater `layoutId="nav-active-dot"` Cyan-Punkt unten
- CTA „Start a project" als `MagneticButton` mit Sheen-Sweep-Animation
- Logo: `logo-black.png` via `<img>`, Hover-Scale-Spring

### `Hero.tsx` — Hero-Sektion
- **H1-Typografie**: `clamp(40px, 7vw, 110px)`, Montserrat Black, `leading-[0.9]`
- Dreizeilige Headline mit Wort-für-Wort Reveal-Animation (je 1,1 s, Stagger)
- Highlight-Wörter („move", „matter") mit Cyan-Underline-Sweep  
  (`scaleX: 0 → 1`, `originX: 0`, `bg-accent/70`, `rounded-full`)
- Parallax-Orbs: zwei große Blur-Kreise mit `useTransform` Y-Versatz beim Scrollen
- Aufteilung: Text `col-span-8` / `DynamicFrame` `col-span-4`
- Eyebrow mit Live-Ping-Dot + Sparkles-Chip
- Dual-CTA: Cyan-Primär + Glas-Sekundär (beide magnetisch)
- Footer-Statistikleiste: 4 Kennzahlen mit Border-Top

### `DynamicFrame.tsx` — Physik-Showreel-Rahmen
Drei gleichzeitige Physik-Inputs:

| Input | Effekt | Bibliothek |
|---|---|---|
| Scroll-Geschwindigkeit (`useVelocity`) | Border-Radius ±8 px, Rotation ±3°, Inner-Scale | Framer Motion |
| Cursor-Nähe (Euklidische Distanz) | Frame-Scale bis 1.04 | `window.addEventListener` |
| Cursor-Position (relativ zur Mitte) | 3D-Tilt `rotateX/Y ±6°`, Perspektive 1000 | Spring `stiffness:120` |

- Inneres: Gradient `ink → #1f3a47 → accent`, SVG-Gitter (8 %), pulsierender Play-Button
- `logo-white.png` unten links, Timecode oben rechts

### `Services.tsx` — Bento-Grid
- 12-Spalten-Grid, `auto-rows-[minmax(220px,auto)]`, `md:min-h-[340px]`
- 6 Karten in 3 Tonfärbungen: `light` (fog), `accent` (cyan), `dark` (ink)
- Hover: Blob-Expansion (scale 0.4 → 1.2), Arrow rotiert 45°, `shadow-floaty`
- Karten-Spans: 7+5, 3+2, 7+5 (asymmetrisches Layout)

### `Process.tsx` — 4-Schritte-Akkordeon
- Interaktiver Accordion-Stack in weißer Karte auf `bg-fog`
- Aktiver Schritt: `bg-ink text-paper`, Icon-Badge wird Cyan
- Inhalt (AnimatePresence `height: auto`):
  - Kurzbeschreibung
  - **Aktivitäten** (Cyan-Dots)
  - **Deliverables** (Weiß/Mist-Dots)
- Alle 4 Schritte vollständig befüllt: Discovery / Strategy / Design / Development

### `Portfolio.tsx` — Projektgalerie
- `bg-ink` Sektion, vollständig sichtbarer vertikaler Grid (kein horizontales Scrollen)
- 12-Spalten-Layout mit 3 Kartengrößen:
  - `wide`: `col-span-7`, Aspekt `16:10`
  - `tall`: `col-span-5`, Aspekt `4:5`
  - `square`: `col-span-6`, Aspekt `5:4`
- **Asset-Slots** (hierarchisch): `<video>` → `<img>` → Gradient-Fallback
- Video: `autoplay` auf `mouseenter`, Pause+Reset auf `mouseleave`
- Hover: Scale `1.0 → 1.06` (1,4 s), Grade-Overlay, „View case"-Pill
- Index-Chip oben links, Arrow-Chip (rotiert 45° on hover) oben rechts
- Integrierter `ClientLogos` (dark) als Marquee am Sektionsende

### `ClientLogos.tsx` — Logo-Marquee
- Polymorphe Komponente: `variant="light"` (helle Seiten) / `variant="dark"` (Portfolio)
- 10 Kunden-Wordmarks in Montserrat Black, Leerzeichen-Fade an den Rändern
- `showHeader` Prop für optionalen Eyebrow-Header
- Duplikat-Technik für nahtlose Endlosschleife (2× Array, `animate-marquee` 40 s)

### `Testimonials.tsx` — Kundenstimmen
- Asymmetrisches 6-Spalten-Grid:  
  Erste Karte `col-span-4 row-span-2` (groß, dunkel, Akzent), restliche `2–3 col`
- Karten: Weißer Hintergrund auf `bg-fog`, `Quote`-Icon, Initials-Avatar, Rolle
- `whileHover={{ y: -4 }}` Lift, Hover auf `shadow-floaty`
- 5-Sterne-Header mit Durchschnittsbewertung

### `About.tsx` — Studio-Story
- 12-Spalten-Split: Text `col-span-7`, Prinzipien-Karte `col-span-5`
- Prinzipien-Karte: `glass-strong`-Wrapper mit weißem Innen-Panel
- Eingebetteter Marquee (Capabilities-Laufband)
- Typografische Highlights (`<em>`) für „craft" und „speed"

### `Leadership.tsx` — Geschäftsführer
- Zwei asymmetrische Karten: `col-span-7` (Ajet) / `col-span-5` (Noel, `mt-24` Versatz)
- `aspect-[4/5]`, `min-h-[640px]` auf Desktop
- Asset-Slot: `<img>` mit `object-cover absolute inset-0`
- Innen: Scale-animierter Bild-Wrapper (`1.0 → 1.06` on hover)
- Initials-Chip (oben links), Social-Buttons LinkedIn + Mail (oben rechts)
- Hover-Reveal-Quote: `height: auto` AnimatePresence, italic, Framer-Motion
- Arrow-Chip rotiert 45° on hover

**Aktuelle Daten:**
| Name | Rolle | E-Mail |
|---|---|---|
| Ajet Ibrahimi | Managing Director · Creative | ajet@nopo.studio |
| Noel Vuylsteke | Managing Director · Strategy | noel@nopo.studio |

### `FAQ.tsx` — FAQ-Akkordeon
- 2-Spalten: Editoriale Überschrift links, Akkordeon rechts
- `Plus`-Icon rotiert auf 45° (Spring), `AnimatePresence height: auto`
- 5 Fragen vollständig befüllt
- `bg-fog` Hintergrund

### `Footer.tsx`
- `bg-ink`, große „Have a brief?"-Überschrift mit Italic-Akzent
- Kreisförmiger magnetischer CTA-Button (Ø 52 px, `bg-accent`)
- `logo-white.png` als Footer-Wordmark
- 4-Spalten-Link-Navigation (Studio / Reach / Social / Legal)
- `motion.a` Links mit `whileHover={{ x: 4 }}` Spring-Slide

### `MagneticButton.tsx` — Primitiv
- Polymorphisch: `as="button"` oder `as="a"`
- `strength` Prop (Standard 24 px)
- Spring-Tracking: `stiffness: 200, damping: 18, mass: 0.4`
- `whileTap={{ scale: 0.96 }}`

### `AnimatedText.tsx` — Primitiv
- Wort-für-Wort Clip-Reveal mit `overflow: hidden` Wrapper
- `whileInView` + `viewport={{ once: true, margin: "-15%" }}`
- Konfigurierbares Stagger (Standard 0,06 s) und Delay
- Polymorphisch: `as="h1"` bis `as="span"`

### `SmoothScroll.tsx` — Primitiv
- Lenis `duration: 1.15`, Easing `1 - 2^(-10t)` (exponentielle Abbremsung)
- `smoothWheel: true`, `wheelMultiplier: 1.0`, `touchMultiplier: 1.5`
- RAF-Loop, sauber aufgeräumt via `useEffect` Cleanup

---

## 4. Design-System & Tokens

### Farbpalette
```
#ffffff  paper    — Primärhintergrund
#f4f4f5  fog      — Sekundärhintergrund
#ededed  cloud    — Karten-Hover-Hintergrund
#a0a0a0  mist     — Sekundärtext, Eyebrows
#1a1a1a  ink      — Primärtext, dunkle Sektionen
#5BC5E6  accent   — CTA, Highlights, Aktiv-Zustände
#cfeff9  accent.soft — Sanfte Akzentflächen
```

### Typografie
```
Montserrat (700, 800, 900)  font-display  Headlines, Logos, Zahlen
Inter      (300, 400, 500)  font-sans     Fließtext, Labels, UI
```

### Abstände & Radien
```
rounded-4xl   2rem    Karten Standard
rounded-5xl   2.5rem  Karten Premium
rounded-6xl   3rem    Leadership-Karten
```

### Animationskurven
```
[0.16, 1, 0.3, 1]   ease-spring   Alle UI-Übergänge (Kowalski-Kurve)
stiffness: 380       Nav-Pill      Hover-Glide
stiffness: 200       Magnetismus   Button-Tracking
stiffness: 120       DynamicFrame  Tilt/Scale
```

---

## 5. Assets & Medien

| Datei | Typ | Verwendung |
|---|---|---|
| `logo-black.png` | PNG transparent | Navigation (hell) |
| `logo-white.png` | PNG transparent | Footer, DynamicFrame (dunkel) |
| `ajet-ibrahimi.webp` | WebP ~470 KB | Leadership-Karte links |
| `noel-vuylsteke.webp` | WebP ~440 KB | Leadership-Karte rechts |

**Platzhalter für Projektkarten** (Portfolio): Gradient-Fallbacks aktiv.  
Zum Ersetzen: `image: "/projektname.jpg"` oder `video: "/projektname.mp4"` in  
`components/Portfolio.tsx` in der `projects`-Array-Definition eintragen.

---

## 6. CI/CD & Deployment

### Workflow `.github/workflows/deploy.yml`

```
Push auf main
    ↓
actions/checkout@v4
    ↓
actions/setup-node@v4 (Node 20, npm cache)
    ↓
actions/configure-pages@v5 (static_site_generator: next)
    ↓
actions/cache@v4 (.next/cache)
    ↓
npm ci
    ↓
npx next build  [NEXT_PUBLIC_BASE_PATH=/nopo-webseite]
    ↓
actions/upload-pages-artifact@v3 (./out)
    ↓
actions/deploy-pages@v4
    ↓
https://ajetibr.github.io/nopo-webseite/
```

**Wichtig:** In GitHub muss unter  
`Settings → Pages → Build and deployment → Source: GitHub Actions`  
gesetzt sein, damit der Deploy-Job ausgeführt werden kann.

### Lokale Entwicklung
```bash
cd C:\NOPO_Landingpage
npm install
npm run dev       # http://localhost:3000
npm run build     # Testet den statischen Export (erzeugt ./out)
```

---

## 7. Commit-Historie

| Hash | Nachricht |
|---|---|
| `59b8b07` | fix: resolve broken images on GitHub Pages deployment |
| `d03f18d` | fix: replace next/image with img tags for static export |
| `61e02e6` | feat: integrate real logo and team photos |
| `1392551` | ci: add GitHub Pages deploy workflow for static Next.js export |
| `650fcea` | chore(next): enable static export for GitHub Pages |
| `5c6d898` | Erster Upload |

---

## 8. Bekannte Bugfixes

### Fix 1 — `next/image` mit `fill` in statischem Export
**Problem:** `<Image fill>` benötigt `position: relative` am direkten Parent.  
Der Bild-Wrapper hatte `position: absolute` → Bild renderte ins Nichts (schwarze Fläche).  
**Lösung:** Alle Bildstellen auf native `<img>`-Tags umgestellt.

### Fix 2 — Absolute Pfade auf GitHub Pages (Subdirectory)
**Problem:** `/logo-black.png` löst unter `ajetibr.github.io/nopo-webseite/`  
als `ajetibr.github.io/logo-black.png` auf → 404.  
**Lösung:** `NEXT_PUBLIC_BASE_PATH=/nopo-webseite` im Build, `lib/basePath.ts`  
Helper, alle `<img src>` nutzen Template-Literal mit `${BASE_PATH}`.

### Fix 3 — Leerzeichen in Dateinamen
**Problem:** `src="/Ajet Ibrahimi.webp"` ist eine ungültige URL.  
**Lösung:** `git mv` → `ajet-ibrahimi.webp` / `noel-vuylsteke.webp`.

### Fix 4 — Section Stacking / Z-Index Bleed
**Problem:** Negative Margins (`-mt-10`) + fehlende `bg-*`-Klassen ließen  
Sektionen durchscheinen oder überlagern.  
**Lösung:** Jede Sektion hat `relative z-10` + explizite `bg-paper/fog/ink` Klasse.  
Alle `-mt-10` und `rounded-t-[80px]` Übergangshacks entfernt.

---

## 9. Erweiterungshinweise

### Portfolio-Karten mit echten Assets befüllen
```ts
// components/Portfolio.tsx → projects-Array
{
  title: "Projektname",
  client: "Kunde",
  category: "Kategorie",
  year: "2026",
  size: "wide",                        // wide | tall | square
  image: "/projekte/name.jpg",         // Standbild
  video: "/projekte/name.mp4",         // Hover-Video (muted, loop)
  poster: "/projekte/name-poster.jpg"  // Video-Vorschaubild
}
```

### Custom Domain einrichten
1. In GitHub: `Settings → Pages → Custom domain` eintragen
2. In `next.config.mjs`: `NEXT_PUBLIC_BASE_PATH` leer lassen  
   (oder aus dem Workflow-`env`-Block entfernen)

### Namen & Kontaktdaten aktualisieren
- **Leadership E-Mails & LinkedIn**: `components/Leadership.tsx` → `directors`-Array
- **Footer Kontakt**: `components/Footer.tsx` → `FooterCol` mit `title="Reach"`
- **Nav CTA-Link**: `components/Navigation.tsx` → `href="#contact"`

### Neue Sprache / Übersetzung
Alle sichtbaren Texte liegen direkt in den Komponenten (kein i18n-System).  
Für Mehrsprachigkeit: `next-intl` oder `next-i18next` integrieren.
