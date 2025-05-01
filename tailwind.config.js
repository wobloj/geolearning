/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
const plugin = require('tailwindcss/plugin')

const threeDEffect = plugin(function ({ addUtilities }) {
  addUtilities({
    '.rotate-y-180':{
      transform: 'rotateY(180deg)',
    },
    '.preserve-3d': {
      transformStyle: 'preserve-3d',
    },
    '.perspective': {
      perspective: '1000px',
    },
    '.backface-hidden': {
      backfaceVisibility: 'hidden',
    }
  });
});

module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors:{
        backgroundlight: "#FDFAF6",
        backgrounddark: "#282828",
      },
      fontFamily: {
        monts: ["Montserrat", ...defaultTheme.fontFamily.sans],
        awesome: ["Font Awesome 5 Free"],
      },
      backgroundImage: {
        default:
          "url('../src/assets/backgrounds/bg-default.png');",
        map: "url('https://www.transparenttextures.com/patterns/mooning.png')",
      },
    },
  },
  plugins: [
    threeDEffect,
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
