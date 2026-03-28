/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        brand:    '#F5A420',
        dark:     '#14182E',
        warm:     '#FDF8EF',
        white:    '#FFFFFF',
        t1:       '#F5A420',
        t2:       '#3AB6EC',
        t3:       '#8A68D4',
        t4:       '#1CBDAC',
        success:  '#3AC47A',
        error:    '#E95C5C',
      },
    },
  },
  plugins: [],
}
