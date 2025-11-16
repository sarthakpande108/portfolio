/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // Custom configuration if you want to explicitly define the colors used
      colors: {
        'emerald': {
          '400': '#34d399',
          '600': '#059669',
          '700': '#047857',
          '900': '#064e3b',
        },
        'fuchsia': {
          '200': '#f0abfc',
          '400': '#e879f9',
          '500': '#d946ef',
          '600': '#c026d3',
          '700': '#a21caf',
          '800': '#86198f',
          '900': '#701a75',
        },
        'black': '#000000',
        'gray-800': '#1f2937', // Kept gray-800 for sections
        'gray-900': '#111827', // Used in some background layers
      }
    },
  },
  plugins: [],
}
