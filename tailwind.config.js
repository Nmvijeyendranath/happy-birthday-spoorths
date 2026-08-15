/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        script: ['"Pinyon Script"', 'cursive'],
      },
      colors: {
        ocean: {
          50: '#eef7fb',
          100: '#d4ecf6',
          200: '#a8d8ec',
          300: '#74bddc',
          400: '#459bc7',
          500: '#2b7eaa',
          600: '#216488',
          700: '#1d5170',
          800: '#1c425b',
          900: '#1b384d',
          950: '#0f2533',
        },
        sand: {
          50: '#fbf6ec',
          100: '#f5ead0',
          200: '#ecd6a3',
          300: '#e0bd72',
          400: '#d4a64a',
          500: '#c08f33',
          600: '#a0722a',
          700: '#7e5a24',
          800: '#5d431b',
          900: '#3d2c12',
        },
        sunset: {
          50: '#fff3ec',
          100: '#ffe2cf',
          200: '#ffc7a0',
          300: '#ffa66b',
          400: '#ff8647',
          500: '#f56a2e',
          600: '#d94f23',
          700: '#b23a1d',
          800: '#872c19',
          900: '#5e1f12',
        },
      },
      boxShadow: {
        glow: '0 0 40px rgba(255, 166, 107, 0.35)',
        deep: '0 20px 60px -20px rgba(15, 37, 51, 0.6)',
      },
    },
  },
  plugins: [],
};
