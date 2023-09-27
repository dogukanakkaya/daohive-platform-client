/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#431fd9',
        'secondary': 'var(--secondary-color)'
      },
      backgroundImage: {
        'dropzone-stripe': 'var(--dropzone-stripe)'
      }
    }
  },
  plugins: []
}
