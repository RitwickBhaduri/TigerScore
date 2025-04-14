module.exports = {
  content: [
    "./components/**/*.{js,jsx}",
    "./app.js",
    "./index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E5931B',
        'gray': {
          900: '#202020',  // Main background
          800: '#2B2B31',  // Component backgrounds
          700: '#30303D',  // Input fields
          600: '#272733',  // Disabled states
        }
      }
    }
  },
  plugins: [],
} 