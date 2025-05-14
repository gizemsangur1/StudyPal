import React, { createContext, useContext, useState, useEffect } from "react";
import { useColorScheme } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { lightTheme, darkTheme, ThemeType } from "../hooks/theme";

type ThemeName = "light" | "dark" | "system";

interface ThemeContextProps {
  theme: ThemeType;
  themeName: ThemeName;
  setThemeName: (name: ThemeName) => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);
const STORAGE_KEY = "@studypal_theme";

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const systemScheme = useColorScheme(); 
  const [themeName, setThemeNameState] = useState<ThemeName>("system");

  useEffect(() => {
    const load = async () => {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored === "light" || stored === "dark" || stored === "system") {
        setThemeNameState(stored);
      }
    };
    load();
  }, []);

  const setThemeName = (name: ThemeName) => {
    setThemeNameState(name);
    AsyncStorage.setItem(STORAGE_KEY, name);
  };

  const effectiveTheme =
    themeName === "system"
      ? systemScheme === "dark"
        ? darkTheme
        : lightTheme
      : themeName === "dark"
      ? darkTheme
      : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme: effectiveTheme, themeName, setThemeName }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("useTheme must be used inside ThemeProvider");
  return context;
};
