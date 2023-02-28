/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.vue"],
  theme: {
    extend: {
      colors: {
        primary: "#F3EADA",
        primaryDark: "#15131B",
        secondary: "#4EABF8",
        secondaryDark: "#1E1C24",
        accent: "#FFA17A",
        accentDark: "#22BE74",
        lighten: "#BEBCC6",
        darken: "#F3EADA",
      },
    },
  },
  plugins: [],
};
