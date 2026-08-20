import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        investra: {
          blue: '#103B56',
          gold: '#D2B06A',
          light: '#F7F9FA',
          ink: '#1F2937',
          muted: '#6B7280',
        },
      },
    },
  },
  plugins: [],
};
export default config;
