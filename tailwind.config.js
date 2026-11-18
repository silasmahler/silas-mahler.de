/** @type {import('tailwindcss').Config} */
const v = name => `rgb(var(--${name}) / <alpha-value>)`;

export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./impressum.html",
    "./datenschutz.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: v("bg"),
        card: v("card"),
        raised: v("raised"),
        ink: v("ink"),
        ink2: v("ink2"),
        mute: v("mute"),
        accent: v("accent"),
        line: "rgb(var(--ink) / 0.1)"
      },
      fontFamily: {
        sans: [
          "system-ui",
          "-apple-system",
          '"Segoe UI"',
          "Roboto",
          "sans-serif"
        ],
        mono: ["ui-monospace", '"SF Mono"', "Menlo", "Consolas", "monospace"]
      },
      transitionTimingFunction: {out: "cubic-bezier(0.22, 1, 0.36, 1)"}
    }
  },
  plugins: []
};
