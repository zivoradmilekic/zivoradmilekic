/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color, #0E15E1)",
        secondary: "var(--secondary-color, #13D7DE)",
      },
    },
  },
  plugins: [],
  //   ...(process.env.NODE_ENV == "development" && {
  //     safelist: [{ pattern: /.*/ }],
  //   }),
};
