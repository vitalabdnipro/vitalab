const { fontFamily } = require("tailwindcss/defaultTheme")

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", ...fontFamily.sans],
      },
      fontSize: { s: "13px", m: "15px" },
      gridTemplateColumns: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      gridTemplateRows: {
        "auto-fit": "repeat(auto-fit, minmax(0, 1fr))",
        "auto-fill": "repeat(auto-fill, minmax(0, 1fr))",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      maxWidth: {
        "8xl": "100rem",
      },
      screens: {
        // "2xsmall": "320px",
        // xsmall: "512px",
        // small: "1024px",
        // medium: "1280px",
        // large: "1440px",
        // xlarge: "1680px",
        // "2xlarge": "1920px",
      },
      // fontFamily: {
      //   sans: [
      //     "Inter",
      //     "-apple-system",
      //     "BlinkMacSystemFont",
      //     "Segoe UI",
      //     "Roboto",
      //     "Helvetica Neue",
      //     "Ubuntu",
      //     "sans-serif",
      //   ],
      // },
      colors: {
        "alice-blue": "#f6f9fc",
        link: "#635bff",
        "link-hover": "#0a2540",
        title: "#0a2540",
        "vl-green": "#006241",
        "vl-green-light": "#00754a",
        "vl-green-lighter": "#d4e9e2",
        "vl-green-dark": "#1e3932",
        "vl-orange-accent": "#FF5B4F",
        "brand-color": "#1e3932",
        //
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: `var(--radius)`,
        md: `calc(var(--radius) - 2px)`,
        sm: "calc(var(--radius) - 4px)",
      },
      transitionTimingFunction: {
        hover: "cubic-bezier(0.215,0.61,0.355,1)",
      },
      boxShadow: {
        "card-xsmall":
          "0 2px 5px -1px rgba(50,50,93,0.25),0 1px 3px -1px rgba(0,0,0,0.3)",
        "card-small":
          "0 6px 12px -2px rgba(50,50,93,0.25),0 3px 7px -3px rgba(0,0,0,0.3)",
        "card-medium":
          "0 13px 27px -5px rgba(50,50,93,0.25),0 8px 16px -8px rgba(0,0,0,0.3)",
        "card-large":
          "0 30px 60px -12px rgba(50,50,93,0.25),0 18px 36px -18px rgba(0,0,0,0.3)",
        "card-xlarge":
          "0 50px 100px -20px rgba(50,50,93,0.25),0 30px 60px -30px rgba(0,0,0,0.3)",
        "card-Large-inset":
          "inset 0 30px 60px -12px rgba(50,50,93,0.25),inset 0 18px 36px -18px rgba(0,0,0,0.3)",
        "shadow-test":
          "0px 3px 6px -3px rgba(0,0,0,.05),0px 2px 4px -2px rgba(0,0,0,.05),0px 1px 2px -1px rgba(0,0,0,.05),0px 1px 1px -1px rgba(0,0,0,.05),0px 1px 0px -1px rgba(0,0,0,.05)",
      },
      aspectRatio: {
        "540/368": "540 / 368",
      },
      gridTemplateAreas: {
        newsLayout: ["hero hero hero hero", "meta body body body"],
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [
    require("tailwindcss-radix"),
    require("tailwindcss-animate"),
    require("tailwind-gradient-mask-image"),
    require("@savvywombat/tailwindcss-grid-areas"),
    require("@tailwindcss/forms"),
  ],
}
