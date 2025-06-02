const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        whiteAlways: "rgb(255 255 255 / <alpha-value>)",
        white: "rgb(var(--white) / <alpha-value>)",
        black: "rgb(var(--black) / <alpha-value>)",
        background: "rgb(var(--background) / <alpha-value>)",
        surface: "rgb(var(--surface) / <alpha-value>)",
        surfaces: {
          high: "rgb(var(--surface-high) / <alpha-value>)",
          medium: "rgb(var(--surface-medium) / <alpha-value>)",
          error: "rgb(var(--surface-error) / <alpha-value>)",
          overlay: "rgb(var(--surface-overlay) / <alpha-value>)",
        },
        ...(() => {
          const colors = [
            "gray",
            "red",
            "orange",
            "yellow",
            "green",
            "teal",
            "blue",
            "purple",
            "pink",
            "primary",
            "secondary",
          ];
          const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

          for (const color of colors) {
            const colorIndex = colors.indexOf(color);
            delete colors[colorIndex];

            colors[color] = {};

            for (const level of levels) {
              colors[color][level] =
                `rgb(var(--${color}-${level}) / <alpha-value>)`;
            }
          }

          return colors;
        })(),
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-animate"),
    plugin(function ({ addBase, addComponents, addUtilities, theme }) {
      addUtilities({
        ".glow-lg": {
          boxShadow: `0 0 20px 2px rgba(var(--primary-500), 0.5)`,
        },
      });
    }),
  ],
};
