/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{jsx,tsx}",
    "./src/components/**/*.{jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  corePlugins: {
    preflight: false,
  }
}
