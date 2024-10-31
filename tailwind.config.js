/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    'node_modules/react-daisyui/dist/**/*.js',
    'node_modules/react-daisyui/dist/**/*.jsx',
  ],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['sunset'],
    darkTheme: 'sunset',
  },
};
