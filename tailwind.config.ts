import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        ink: "#1a1a1a",
        paper: "#ffffff",
        mist: "#a0a0a0",
        fog: "#f4f4f5",
        cloud: "#ededed",
        accent: {
          DEFAULT: "#5BC5E6",
          soft: "#cfeff9",
          deep: "#2ea3c9"
        }
      },
      fontFamily: {
        display: ["var(--font-display)", "Montserrat", "sans-serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"]
      },
      letterSpacing: {
        tightest: "-0.05em",
        wider2: "0.18em"
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
        "6xl": "3rem"
      },
      boxShadow: {
        floaty:
          "0 30px 80px -40px rgba(26,26,26,0.25), 0 8px 28px -10px rgba(26,26,26,0.08)",
        soft: "0 10px 40px -20px rgba(26,26,26,0.18)"
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.16, 1, 0.3, 1)"
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" }
        },
        floaty: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" }
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" }
        }
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        floaty: "floaty 6s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
