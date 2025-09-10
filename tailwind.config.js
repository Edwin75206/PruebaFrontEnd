// tailwind.config.js
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0B0B0B",
        coal: "#1A1A1A",
        espresso: "#3E2E2E",
        latte: "#6B4E3D",
        cream: "#F5F2EE",
        gold: "#C9A227",
      },
      boxShadow: {
        card: "0 6px 24px rgba(0,0,0,0.10)",
      },
      borderRadius: {
        xl: "14px",
      },
    },
  },
  plugins: [],
};
