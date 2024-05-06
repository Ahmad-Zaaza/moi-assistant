/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  // Disable the preflight style resetting so that it does not interfere with the default styles that Ant Design will load.
  corePlugins: {
    preflight: false,
  },
};
