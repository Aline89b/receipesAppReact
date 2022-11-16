
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: { 
        "primary": '0 0 10px 5px grey',
        'secondary': 'inset 0 0 10px 5px green',
      },
    
    },
  },
  screens: {
    "sm": "640px",
    "md": "768px",
    "lg": "1024px",
    "xl": "1288px",
  },
  plugins: [],
}
