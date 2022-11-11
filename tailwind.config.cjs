/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-white": "#f3f4f6",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
