/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette pulled from the reference design (warm brown / cream)
        cream: "#F4EFE4",       // page background
        "cream-2": "#EDE6D6",   // card / section background
        brown: {
          DEFAULT: "#6B4A32",   // primary brand brown (circles, badges)
          dark: "#4A3323",      // deep brown (buttons, accents)
          light: "#8A6A4C",
        },
        ink: "#1A1410",         // near-black text / dark pill buttons
        mustard: "#E8A33D",     // accent dot / highlight
        sage: "#8FA98C",        // secondary accent swatch
      },
      fontFamily: {
        sans: ["var(--font-body)", "sans-serif"],
        display: ["var(--font-display)", "sans-serif"],
      },
      borderRadius: {
        pill: "999px",
      },
    },
  },
  plugins: [],
};
