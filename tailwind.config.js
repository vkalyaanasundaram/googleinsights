const colors = require("tailwindcss/colors");
const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
    fontFamily: {
      body: ["Lato"],
    },
    container: {
      center: true,
    },
    // fontFamily: {
    //   sans: ["Inter", ...defaultTheme.fontFamily.sans],
    // },
    colors: {
      primary: colors.teal,
      gray: colors.trueGray,
      kapitus: "#00395d",
      green: "#72b664",
      white: "#ffffff",
      footer: "#e6ebef",
      titleGreen: "rgb(5, 113, 58)",
      pink: "#a94068",
      liteblue: "#66899e",
      errorred: "rgb(170, 68, 107)",
      kapitusLiteGreen: "rgb(115, 181, 100)",
      lightgreen: "rgb(114 182 100)",
      kapitusblue: "#66899e",
      formred: "#790000",
      code: {
        green: "#b5f4a5",
        yellow: "#ffe484",
        purple: "#d9a9ff",
        red: "#ff8383",
        blue: "#93ddfd",
      },
    },
    // fontFamily: false,
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
