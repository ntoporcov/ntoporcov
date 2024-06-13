/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
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
    },
  },
  plugins: [
    require("tailwindcss-animate"),
  ],
}

