/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0d0916',
        'brand-purple': '#5C33C1',
        'brand-teal': '#a754f8',
        'stories-purple': '#C9B8FF',
        'weds-purple': '#5B21B6',
        'media-purple': '#B8A5E0',
        'primary': '#8f56c9ff',
        'primary-light': '#a35beaff',
        'secondary-bg': '#1a1228',
        'text-color': '#e6e0f5',
        'heading-color': '#ffffff',
        'border-color': '#2a2040',
      },
      fontFamily: {
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        poppins: ['var(--font-poppins)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}