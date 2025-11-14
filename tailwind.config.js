/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f5f5',
          100: '#ebebeb',
          500: '#222222',
          600: '#1a1a1a',
          700: '#111111',
        },
        kream: {
          black: '#222222',
          white: '#ffffff',
          gray: {
            50: '#fafafa',
            100: '#f4f4f4',
            200: '#ebebeb',
            300: '#d3d3d3',
            400: '#bcbcbc',
            500: '#666666',
            600: '#555555',
            700: '#333333',
          }
        },
        success: '#00c73c',
        warning: '#ffa500',
        danger: '#f15746',
      },
      fontFamily: {
        sans: ['-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        'kream': '0 4px 12px rgba(0, 0, 0, 0.08)',
        'kream-hover': '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
    },
  },
  plugins: [],
}

