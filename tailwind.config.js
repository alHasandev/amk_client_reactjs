module.exports = {
  purge: ["./public/**/*.html", "./src/*.js", "./src/components/**/*.js"],
  theme: {
    extend: {
      padding: {
        "14": "3.5rem",
      },
    },
  },
  variants: {
    display: ["responsive", "hover"],
    visibility: ["responsive", "hover"],
  },
  plugins: [],
};
