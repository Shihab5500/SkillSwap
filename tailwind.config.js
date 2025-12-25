/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      container: { center: true, padding: "1rem" },
    },
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        skillswap: {
          primary: "#6366F1",
          secondary: "#22C55E",
          accent: "#F59E0B",
          neutral: "#1F2937",
          "base-100": "#FFFFFF",
          info: "#0EA5E9",
          success: "#16A34A",
          warning: "#F59E0B",
          error: "#EF4444",
        },
      },
      "dark",
    ],
  },
};
