module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
  purge: ["./components/**/*.{js,ts,jsx,tsx}", "./pages/**/*.{js,ts,jsx,tsx}"],
  theme: {
    filter: {
      blur: "blur(32px)",
    },
    backdropFilter: {
      none: "none",
      blur: "blur(16px)",
    },
    textShadow: {
      teal: "0 0 2px rgba(22,189,202, 0.5)",
      ["teal-lg"]: "0 0 10px rgba(22,189,202, 0.6)",
    },
    typography: {
      default: {
        css: {
          color: "#333",
          a: {
            color: "#3182ce",
            "&:hover": {
              color: "#2c5282",
            },
          },
        },
      },
    },
  },
  variants: {
    textShadow: ["responsive", "hover"],
    display: ["responsive", "hover", "focus", "group-hover"],
    boxShadow: ["responsive", "hover", "focus", "group-hover"],
    scale: ["responsive", "hover", "focus", "group-hover"],
    textShadow: ["responsive", "hover", "focus"],
  },
  plugins: [
    require("tailwindcss-filters"),
    require("tailwindcss-gap"),
    require("tailwindcss-typography"),
    require("@tailwindcss/typography"),
    require("@tailwindcss/ui"),
  ],
};
