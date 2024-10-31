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
    themes: [
      {
        sunset: {
          ...require('daisyui/src/theming/themes')['sunset'],
          primary: '#4ade80', // mint green
          'primary-focus': '#22c55e',
        },
      },
    ],
    darkTheme: 'sunset',
  },
};
