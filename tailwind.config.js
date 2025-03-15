/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      colors:{
        'primary':{
          100:"#f8f9fa",
          200: "#f1f3f5",
          300:"#e9ecef",
          400: "#dee2e6",
          500: "#ced4da",
          600: "#adb5bd",
          700: "#868e96",
          800: "#495057",
          900: "#343a40",
          1000: "#212529",
        }
      }
    },
  },
  plugins: [],
}
