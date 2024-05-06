import { useLocalStorage } from "usehooks-ts";
import { themes } from "./themes.config";

export default function useTheme() {
  const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");

  const switchTheme = () => {
    setTheme((current) => (current === "dark" ? "light" : "dark"));
  };

  return {
    switchTheme,
    themeConfig: themes.find((item) => item.name === theme)?.themeConfig,
    isLightTheme: theme === "light",
  };
}
