import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/module/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'Urbanist': ['Urbanist', 'sans-serif'],
        'Manrope': ['Manrope', 'sans-serif']
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        'mainWhite': '#F1F1F1',
        'mainWhiteShade': '#FCFCFC',
        'mainBlue': '#576BEA',
        'mainGray': '#95979D',
        'mainRed': '#FB7373',
        'mainGreen': '#A5DD9B',
      },
      borderWidth: {
        '1': '1.5px'
      },
      boxShadow: {
        'sectionShadow': '0 8px 30px rgb(0,0,0,0.12)'
      },
      borderRadius: {
        'sectionCorner': '20px'
      },
      fontSize: {
        'big-title': '30px',
        'section-title': '20px',
        'price-title': '40px',
        'section-subtitle': '15px',
        'section-content': '12px',
      }
    },
  },
  plugins: [],
};
export default config;
