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
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
