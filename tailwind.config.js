/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
    'bg-purple-200',
    'text-purple-800',
    'bg-teal-300',
    'text-teal-900',
    'bg-blue-200',
    'text-blue-800',
    'bg-purple-300',
    'text-purple-900',
    'bg-yellow-200',
    'text-yellow-800',
    'bg-orange-300',
    'text-orange-900',
    'bg-pink-200',
    'text-pink-800',
    'bg-gray-200',
    'text-gray-800',
  ],
}
