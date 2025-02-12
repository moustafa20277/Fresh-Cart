/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container:{
      center: true,
    },
    transitionDuration : {
      transitionDuration : '1s',
    },
    extend: {
      colors :{
        main : '#0aad0a',
      },
    },
  },
  plugins: [
  ],
}

