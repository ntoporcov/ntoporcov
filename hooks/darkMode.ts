
import {useLocalStorage} from "react-use";

export const htmlElement = () => document.getElementsByTagName("html")?.[0];

export const useDarkModeState = () => {
  const [isDarkMode, setIsDarkMode] = useLocalStorage("isDarkMode", true);

  const toggleDarkMode = () => {
    htmlElement().classList.toggle("dark");
    setIsDarkMode(!isDarkMode);
  };

  return { isDarkMode, toggleDarkMode, setIsDarkMode };
};
