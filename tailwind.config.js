/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E32222',
          50: '#F8C5C5',
          100: '#F5B3B3',
          200: '#F18F8F',
          300: '#EC6A6A',
          400: '#E84646',
          500: '#E32222',
          600: '#B61717',
          700: '#841111',
          800: '#520A0A',
          900: '#200404',
          950: '#080101',
        },
      },
    },
  },
  plugins: [],
};
