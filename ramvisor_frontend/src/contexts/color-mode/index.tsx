"use client";

import { RefineThemes } from "@refinedev/antd";
import { App as AntdApp, ConfigProvider, theme } from "antd";
import Cookies from "js-cookie";
import React, {
  createContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";

type ColorModeContextType = {
  mode: string;
  setMode: (mode: string) => void;
};

export const ColorModeContext = createContext<ColorModeContextType>(
  {} as ColorModeContextType
);

type ColorModeContextProviderProps = {
  defaultMode?: string;
};


export const ColorModeContextProvider: React.FC<
  PropsWithChildren<ColorModeContextProviderProps>
> = ({ children, defaultMode }) => {
  const [isMounted, setIsMounted] = useState(false);
  const [mode, setMode] = useState(defaultMode || "light");

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (isMounted) {
      const theme = Cookies.get("theme") || "light";
      setMode(theme);
    }
  }, [isMounted]);

  const setColorMode = () => {
    if (mode === "light") {
      setTheme("material3-dark");
      setMode("dark");
      Cookies.set("theme", "dark");
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      setMode("light");
      setTheme("material3");
      Cookies.set("theme", "light");
      document.documentElement.setAttribute("data-theme", "light");
    }
  };

 const setTheme = (selectedTheme: string) => {
    const inputElement = document.getElementById(selectedTheme) as HTMLInputElement;
    if (inputElement) inputElement.disabled = false;
    const otherTheme = selectedTheme == "material3" ? "material3-dark" : "material3";
    const otherElement = document.getElementById(otherTheme) as HTMLInputElement;
    if (otherElement) otherElement.disabled = true;
  };


  const { darkAlgorithm, defaultAlgorithm } = theme;

  return (
    <ColorModeContext.Provider
      value={{
        setMode: setColorMode,
        mode,
      }}
    >
      <ConfigProvider
        // you can change the theme colors here. example: ...RefineThemes.Magenta,
        theme={{
          ...RefineThemes.Blue,
          algorithm: mode === "light" ? defaultAlgorithm : darkAlgorithm,
        }}
      >
        <AntdApp>{children}</AntdApp>
      </ConfigProvider>
    </ColorModeContext.Provider>
  );
};
