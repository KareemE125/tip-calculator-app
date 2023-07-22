/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(172, 67%, 45%)',
        secondary: 'hsl(183, 100%, 15%)',
        dim: 'hsl(184,23%,40%)',
        back: 'hsl(185, 41%, 84%)',
        input: 'hsl(202,50%,97%)',
        white: 'hsl(0, 0%, 100%)',
        
      },
      fontSize: {
        'form-input': '24px',
      },
    },
    screens: {
      'mobile': {'max': '640px'},
      'lg': {'max': '900px'},
    },
  },
  plugins: [],
}
