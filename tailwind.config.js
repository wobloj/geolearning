/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin')

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
        map: "url('https://www.transparenttextures.com/patterns/mooning.png')",
        flag: "url('../src/assets/flag.png')",
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'animate-delay': (value) => ({
            animationDelay: value,
          }),
        },
        { values: theme('transitionDelay') }
      )
    }),],
};
