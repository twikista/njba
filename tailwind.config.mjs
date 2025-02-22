/** @type {import('tailwindcss').Config} */
/** @type {import('tailwindcss').Config} */
const tailwindConfig = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: 'var(--primary)',
        secondary: 'var(--secondary)',
        btn: 'var(--btn)',
        black: 'var(--black)',
        white: 'var(--white)',
      },
      fontFamily: {
        // bebas: ['var(--font-bebas-neue)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
