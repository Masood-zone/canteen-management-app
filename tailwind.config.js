import tailwindcssAnimate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["./index.html", "./src/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))", // Deep green
          foreground: "hsl(var(--primary-foreground))", // White
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))", // Very light green
          foreground: "hsl(var(--secondary-foreground))", // Black
        },
        muted: {
          DEFAULT: "hsl(var(--muted))", // Light gray
          foreground: "hsl(var(--muted-foreground))", // Medium gray
        },
        accent: {
          DEFAULT: "hsl(var(--accent))", // Soft gray
          foreground: "hsl(var(--accent-foreground))", // Black
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))", // Red
          foreground: "hsl(var(--destructive-foreground))", // White
        },
        border: "hsl(var(--border))", // Light gray borders
        input: "hsl(var(--input))", // Very light gray inputs
        ring: "hsl(var(--ring))", // Green ring highlights
      },
      fontFamily: {
        sans: ["Noto Sans", "sans-serif"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
