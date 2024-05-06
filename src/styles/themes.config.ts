import { ThemeConfig, theme } from "antd";

export const themes: { name: string; themeConfig: ThemeConfig }[] = [
  {
    name: "light",
    themeConfig: {
      token: {
        fontFamily: "inherit",
        colorBgLayout: "#f7f8f9",
        colorBorder: "#ccd3db",
        colorPrimary: "#ff9800",
        colorTextDescription: "#425366",
        colorLink: "#2176ff",
      },
      components: {
        Layout: {
          controlHeight: 28,
          headerBg: "white",
        },
      },
    },
  },
  {
    name: "dark",
    themeConfig: {
      token: { fontFamily: "inherit", colorPrimary: "#ff9800" },
      algorithm: theme.darkAlgorithm,
      components: {
        Layout: {
          controlHeight: 28,
          headerBg: "black",
          triggerBg: "inherit",
        },
      },
    },
  },
];
