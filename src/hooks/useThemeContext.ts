import { useContext } from "react";
import {
  ThemeContext,
  ThemeHandlerContext,
} from "@/components/ui/ThemeProvider";

export const useTheme = () => useContext(ThemeContext);
export const useThemeHandler = () => useContext(ThemeHandlerContext);
