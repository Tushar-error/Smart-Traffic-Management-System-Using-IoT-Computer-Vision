/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: "#00FF94",
        red: "#FF3F00",
        yellow: "#FFD600",
        bg: "#080808",
        surface: "#111111",
        surface2: "#1a1a1a",
        border: "#222222",
        muted: "#555555",
      },
      fontFamily: {
        bebas: ["Bebas Neue", "cursive"],
        mono: ["DM Mono", "monospace"],
        syne: ["Syne", "sans-serif"],
      },
    },
  },
  plugins: [],
};