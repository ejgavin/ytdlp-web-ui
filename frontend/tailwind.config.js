/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        140: "30rem",
        160: "40rem",
      },
      colors: {
        blueblack: {
          100: "#232f3e",
          200: "#141f2e",
        },
        offwhite: {
          100: "#6e6e6e",
          200: "#e1e1e1",
        },
        bgray: {
          100: "#1d1d1d",
          150: "#6E6E6E",
          200: "#191919",
        },
      },
    },
  },
  plugins: [],
};
