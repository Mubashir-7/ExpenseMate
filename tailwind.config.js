/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,jsx,ts,tsx}',
    './modules/**/*.{js,jsx,ts,tsx}',
    './paywalls/**/*.{js,jsx,ts,tsx}',
  ],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter_400Regular'],
        interBold: ['Inter_700Bold'],
        interSemiBold: ['Inter_600SemiBold'],
        interMedium: ['Inter_500Medium'],
      },
      fontSize: {
        heading: '24px',
      },
      colors: {
        primary: '#EA40A3',
        secondary: '#1C01F5',
      },
      width: {
        lg: 'w-11/12',
      },
      padding: {
        intro: '32',
      },
    },
  },
  plugins: [],
};
