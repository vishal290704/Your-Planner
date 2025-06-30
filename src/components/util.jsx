export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

export const styles = {
  darkBg: "bg-gray-900",
  lightBg: "bg-red-200",
  darkText: "text-white",
  lightText: "text-black",
  darkButton: "bg-gray-900 text-white hover:bg-gray-700",
  lightButton: "bg-red-500 text-black hover:bg-red-700",
  darkBorder: "border-gray-700",
  lightBorder: "border-red-500",
  darkShadow: "shadow-lg shadow-gray-800",
  lightShadow: "shadow-lg shadow-red-500",
  darkHover: "hover:bg-gray-700",
  lightHover: "hover:bg-red-700",
  darkTransition: "transition duration-300 ease-in-out",
  lightTransition: "transition duration-300 ease-in-out",

  darkGradientCompleted:
    "bg-gradient-to-r from-gray-600 via-gray-700 to-gray-900",
  darkGradientUncompleted:
    "bg-gradient-to-r from-red-300 via-red-100 to-red-200",

  inputDark:
    "bg-gray-600 text-white border-gray-700 focus:border-gray-500 focus:ring-gray-500",
  inputLight:
    "bg-white text-black border-gray-300 focus:border-blue-500 focus:ring-blue-500",
  inputPlaceholderDark: "placeholder-gray-300",
  inputPlaceholderLight: "placeholder-gray-500",
  inputFocusDark: "focus:ring-2 focus:ring-gray-500",
  inputFocusLight: "focus:ring-2 focus:ring-blue-500",
  inputBorderDark: "border-gray-700",
  inputBorderLight: "border-gray-300",
};
