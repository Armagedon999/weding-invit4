/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['Playfair Display', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
      colors: {
        'wedding': {
          'ivory': '#F8F4E3',
          'taupe': '#8B7D6B',
          'gold': '#D4AF37',
          'sage': '#8A9B6E',
          'dusty-blue': '#6B8C9E',
          'champagne': '#F7E7CE',
          'cream': '#F5F5F0',
          'charcoal': '#36454F',
        },
      },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        wedding: {
          "primary": "#F8F4E3",
          "secondary": "#8B7D6B",
          "accent": "#D4AF37",
          "neutral": "#36454F",
          "base-100": "#FFFFFF",
        },
      },
    ],
  },
} 