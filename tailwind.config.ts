import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          900: "#103B56",
          accent: "#D2B06A",
          light: "#F7F9FA",
        },
      },
    },
  },
  plugins: [],
};
export default config;
