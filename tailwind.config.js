/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
     extend: {
       keyframes: {
         "fade-in-y": {
          "0%": { opacity: 0, transform: "translateY(25px)" },
          "100%": { opacity: 1, transform: "translateY(0px)" },
          },
          "fade-up-x": {
            "0%": { opacity: 0, transform: "translateX(25px)" },
            "100%": { opacity: 1, transform: "translateX(0px)" },
          }
       },
       animation: {
         "fade-in-y": "fade-in-y 2s linear",
         "fade-up-x": "fade-up-x 2s linear"
       },
     },
   },
   safelist:
    ['animate-[fade-in_1s_ease-in-out]', 'animate-[fade-in-down_1s_ease-in-out]'],
   plugins: [],
 };