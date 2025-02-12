/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#4CA4CD'; // Primary color
const tintColorDark = '#4CA4CD';  // Primary color

export const colors = {
  light: {
    text: '#606261',              // Grey color
    background: '#FCFCFC',        // Tertiary color
    tint: tintColorLight,
    icon: '#1C1C1C',              // Secondary color
    tabIconDefault: '#1C1C1C',    // Secondary color
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: '#FCFCFC',              // Tertiary color
    background: '#1C1C1C',        // Secondary color
    tint: tintColorDark,
    icon: '#FCFCFC',              // Tertiary color
    tabIconDefault: '#FCFCFC',    // Tertiary color
    tabIconSelected: tintColorDark,
  },
};
