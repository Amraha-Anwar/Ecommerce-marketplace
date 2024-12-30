import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        customDarkBlue: 'rgba(0, 117, 128, 10)',  
  			customBlue: 'rgba(39, 35, 67, 1)',
  			customGray: 'rgba(240, 242, 243, 1)',
  			customTeal: 'rgba(2, 159, 174, 1)',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [],
};
export default config;
