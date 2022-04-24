module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      sm: "280px",
      md: "648px",
      lg: "1440px",
      xl: "1920px",
    },
    extend: {
      colors: {
        amazon_blue: {
          light: "#232f3E",
          DEFAULT: "#131921",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
