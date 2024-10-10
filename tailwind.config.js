/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
  safelist: [
     "#e50036",
     "#1f1f1e",
     "#bf67b6",
     "#74cad0",
     "#fdfcfc",
    "shadow-[inset_-13px_13px_27px_#b0002a,inset_13px_-13px_27px_#ff0042]",
    "shadow-[inset_-13px_13px_27px_#181817,inset_13px_-13px_27px_#262625]",
    "shadow-[inset_-13px_13px_27px_#934f8c,inset_13px_-13px_27px_#eb7fe0]",
    "shadow-[inset_-13px_13px_27px_#599ca0,inset_13px_-13px_27px_#8ff8ff]",
    "shadow-[inset_-13px_13px_27px_#c3c2c2,inset_13px_-13px_27px_#ffffff]"
  ],
}