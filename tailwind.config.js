/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#2563eb',
            secondary: '#1e3a8a',
            accent: '#fbbf24',
            error: '#dc2626',
            background: '#f1f5f9',
        },
    },
  },
  plugins: [],
}
