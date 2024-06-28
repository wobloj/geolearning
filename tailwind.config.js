/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        monts: ["Montserrat", ...defaultTheme.fontFamily.sans],
        awesome: ["Font Awesome 5 Free"],
      },
      backgroundImage: {
        default:
          "url('https://www.transparenttextures.com/patterns/grid-me.png')",
      },
    },
  },
  plugins: [],
};
