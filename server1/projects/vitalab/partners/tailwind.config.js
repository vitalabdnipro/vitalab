module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      sans: ["Inter", "sans-serif"],
    },
    extend: {
      boxShadow: {
        stripe: [
          "0px 0px 0px 0px rgba(0, 0, 0, 0)",
          "0px 0px 0px 0px rgba(0, 0, 0, 0)",
          "0px 1px 1px 0px rgba(0, 0, 0, 0.12)",
          "0px 0px 0px 1px rgba(60, 66, 87, 0.16)",
          "0px 0px 0px 0px rgba(0, 0, 0, 0)",
          "0px 0px 0px 0px rgba(0, 0, 0, 0)",
          "0px 2px 5px 0px rgba(60, 66, 87, 0.08)",
        ],
        stripeHover: [
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
          "rgba(0, 0, 0, .12) 0px 1px 1px 0px",
          "rgba(60, 66, 87, .16) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
          "rgba(60, 66, 87, .08) 0px 3px 9px 0px",
          "rgba(60, 66, 87, .08) 0px 2px 5px 0px",
        ],
        stripeFocus: [
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
          "rgba(58, 151, 212, 0.36) 0px 0px 0px 4px",
          "rgba(0, 0, 0, 0.12) 0px 1px 1px 0px",
          "rgba(60, 66, 87, 0.16) 0px 0px 0px 1px",
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
          "rgba(0, 0, 0, 0) 0px 0px 0px 0px",
          "rgba(60, 66, 87, 0.08) 0px 2px 5px 0px",
        ],
      },
    },
    variants: {
      extend: {
        backgroundColor: ["disabled"],
        textColor: ["disabled"],
      },
    },
  },
  // require("@tailwindcss/forms")
  plugins: [require("tailwindcss-radix")()],
};
