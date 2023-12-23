/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./screens/**/*.{js,jsx,ts,tsx}","./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors:{
        "primary":"#DB3022",
        "background":"#F9F9F9",
        "blacked":"#222222",
        "Gray":"#9B9B9B",
        "Error":"#F01F0E",
        "Success":"#2AA952",
      }
    },
  },
  plugins: [],
}
