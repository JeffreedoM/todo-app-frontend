/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#F6EDE5",
        secondary: "#F7D0CA",
        accent: "#9d8189",
        light: "#fff",
        dark: "#000",
      },
      fontFamily: {
        "pally-bold": ["Pally-Bold", "sans-serif"],
        "pally-medium": ["Pally-Medium", "sans-serif"],
        "pally-regular": ["Pally-Regular", "sans-serif"],
      },
    },
  },
  plugins: [],
};
