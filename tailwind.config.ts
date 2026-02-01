import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brutal: {
          black: "#000000",
          white: "#FFFFFF",
          yellow: "#FFFF00",
          pink: "#FF00FF",
          cyan: "#00FFFF",
          red: "#FF0000",
        },
      },
      fontFamily: {
        mono: ["Courier New", "monospace"],
        brutal: ["Impact", "Arial Black", "sans-serif"],
      },
      boxShadow: {
        brutal: "8px 8px 0px 0px #000000",
        "brutal-sm": "4px 4px 0px 0px #000000",
        "brutal-lg": "12px 12px 0px 0px #000000",
      },
    },
  },
  plugins: [],
};
export default config;
