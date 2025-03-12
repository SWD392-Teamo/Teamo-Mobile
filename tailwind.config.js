/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#4CA4CD',
        primaryLight: '#c5deeb',
        secondary: '#1C1C1C',
        tertiary: '#FCFCFC',
        grey: '#606261',
        darkgrey: '#3E424A',
        softgrey: '#E0E0E0',
        red: '#E63946'
      },
      fontFamily: {
        bthin: ["BeVietnamPro-Thin", "sans-serif"],
        bextralight: ["BeVietnamPro-ExtraLight", "sans-serif"],
        blight: ["BeVietnamPro-Light", "sans-serif"],
        bregular: ["BeVietnamPro-Regular", "sans-serif"],
        bmedium: ["BeVietnamPro-Medium", "sans-serif"],
        bsemibold: ["BeVietnamPro-SemiBold", "sans-serif"],
        bbold: ["BeVietnamPro-Bold", "sans-serif"],
        bextrabold: ["BeVietnamPro-ExtraBold", "sans-serif"],
        bblack: ["BeVietnamPro-Black", "sans-serif"],
        righteous: ["Righteous-Regular", "sans-serif"]
      },
      fontSize: {
        bxl: 30,
        bl: 25,
        bm: 20,
        bsm: 15,
        bxsm: 12
      }
    },
  },
  plugins: [],
}