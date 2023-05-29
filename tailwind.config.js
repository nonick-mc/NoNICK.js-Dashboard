/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true
    },
    extend: {
      fontFamily: {
        montserrat: ['var(--font-montserrat)'],
        notoSansJp: ['var(--font-notoSansJp)'],
        mplus2: ['var(--font-mPlus2)'],
      }
    },
  },
  plugins: [],
}
