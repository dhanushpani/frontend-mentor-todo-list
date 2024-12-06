/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"], // Ensure Tailwind processes your files
  darkMode: "class",
  theme: {
    extend: {
      backgroundImage: {
        herodark: "url('../public/images/bg-desktop-dark.jpg')",
        hero: "url('../public/images/bg-desktop-light.jpg')",
        herodarkmobile: "url('../public/images/bg-mobile-dark.jpg')",
        heromobile: "url('../public/images/bg-mobile-light.jpg')",
        background: "linear-gradient hsl(192, 100%, 67%) to hsl(280, 87%, 65%)",
      },
      colors: {
        black: {
          900: "#000000",
        },
        white: "#fff",
        primary: "hsl(220, 98%, 61%)",
        gray: {
          100: "hsl(0, 0%, 98%)",
          300: "hsl(236, 33%, 92%)",
          500: "hsl(233, 11%, 84%)",
          700: "hsl(236, 9%, 61%)",
          900: "hsl(235, 19%, 35%)",
        },
        blue: {
          100: "hsl(235, 21%, 11%)",
          300: "hsl(235, 24%, 19%)",
          400: "hsl(234, 39%, 85%)",
          500: "hsl(236, 33%, 92%)",
          600: "hsl(234, 11%, 52%)",
          900: "hsl(233, 14%, 35%)",
        },
        gradientFrom: "hsl(192, 100%, 67%)",
        gradientTo: "hsl(280, 87%, 65%)",
      },
    },
    fontFamily: {
      custom: ["josefin"],
    },
  },
  plugins: [],
};
