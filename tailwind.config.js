/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./styles/**/*.{js,jsx,ts,tsx,scss}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#4CA4CD',
        secondary: '#1C1C1C',
        tertiary: '#FCFCFC',
        grey: '#606261',
        darkgrey: '#3E424A',
      },
      fontFamily: {
        epthin: ["Epilogue-Thin", "sans-serif"],
        epextralight: ["Epilogue-ExtraLight", "sans-serif"],
        eplight: ["Epilogue-Light", "sans-serif"],
        epregular: ["Epilogue-Regular", "sans-serif"],
        epmedium: ["Epilogue-Medium", "sans-serif"],
        epsemibold: ["Epilogue-SemiBold", "sans-serif"],
        epbold: ["Epilogue-Bold", "sans-serif"],
        epextrabold: ["Epilogue-ExtraBold", "sans-serif"],
        epblack: ["Epilogue-Black", "sans-serif"],
        clash: ["ClashDisplay", "sans-serif"],
      },
    },
  },
  plugins: [],
}