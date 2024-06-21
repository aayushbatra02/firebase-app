// tailwind.config.js
module.exports = {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false,
  theme: {
    extend: {
      colors: {
        darkBlue: "#0E2954",
        lightBg: "#EEEEEE",
        lightGray: "#f2f4f6",
        darkGray: "#8d8383",
      },
      screens: {
        "3xl": "2500px",
      },
      maxHeight: {
        none: "none",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
