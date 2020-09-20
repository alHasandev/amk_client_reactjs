// Import banner image
import lobbyImage from "./images/banner/lobby.jpg";
import logoImage from "./images/logo/logo-frontweb.png";
import profileImage from "./images/profiles/user-girl-t-shirt.png";

export const BTN_COLOR = {
  YELLOW_LIGHT: "bg-yellow-400 text-black hover:bg-yellow-500",
  YELLOW_MEDIUM: "bg-yellow-600 text-white hover:bg-yellow-700",
  YELLOW_DARK: "bg-yellow-800 text-white hover:bg-yellow-900",
};

export const SIZE = {
  SMALL: "max-w-screen-sm",
  MEDIUM: "max-w-screen-md",
  LARGE: "max-w-screen-lg",
  EXTRA_LARGE: "max-w-screen-xl",
};

export const statusColors = {
  present: "text-white bg-green-500 hover:bg-green-700",
  open: "text-white bg-green-500 hover:bg-green-700",
  close: "text-black bg-gray-200 hover:bg-gray-400",
  leave: "text-black bg-yellow-400 hover:bg-yellow-600",
  pending: "text-black bg-yellow-400 hover:bg-yellow-600",
  accepted: "text-white bg-green-500 hover:bg-green-700",
  absence: "text-white bg-red-500 hover:bg-red-700",
  rejected: "text-white bg-red-500 hover:bg-red-700",
  hired: "text-white bg-blue-500 hover:bg-blue-700",
};

export const banner = lobbyImage;
export const logo = logoImage;
export const profile = profileImage;
