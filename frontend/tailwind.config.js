/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#007acc',
          hover: '#005fb8',
          light: '#e5f2fb',
        },
        dark: {
          bg: '#1e1e1e',
          shell: '#252526',
          card: '#2d2d30',
          border: '#3e3e42',
        },
      },
    },
  },
  plugins: [],
};
