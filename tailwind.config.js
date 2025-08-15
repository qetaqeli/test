/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#000C0F",
        dark: "#0C0F11",
        greenGlow: "#00FF9D",
        card: "#121B16",
        border: "#1F2D27",
      },
      boxShadow: {
        green: "0 0 10px #00FF9D",
      },
      backgroundImage: {
        galaxy: "url('/atom.png')",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        fadeIn: "fadeIn 0.5s ease-in-out",
      },
      backdropBlur: {
        sm: '4px',
        DEFAULT: '8px',
        md: '12px',
        lg: '16px',
        xl: '24px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require("tailwindcss-animate"), // ✅ Required for shadcn/ui
  ],
};
