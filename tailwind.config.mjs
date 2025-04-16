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
        'btn-hover': 'var(--hover)',
        'main-blue': 'var(--main-blue)',
        'hover-blue': 'var(--hover-blue)',
        'light-black': 'var(--light-black)',
      },
      fontFamily: {
        // bebas: ['var(--font-bebas-neue)', 'sans-serif'],
      },
      keyframes: {
        shimmer: {
          '100%': { transform: 'translateX(100%)' },
        },
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
      },
    },
  },
  plugins: [],
};

export default tailwindConfig;
