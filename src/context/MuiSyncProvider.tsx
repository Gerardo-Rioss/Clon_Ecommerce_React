import { useEffect, useState } from "react";
import {
  ThemeProvider as MuiThemeProvider,
  createTheme,
} from "@mui/material/styles";
import type { ReactNode } from "react";

/**
 * MUI Theme Provider que se sincroniza con el modo oscuro CSS.
 * Lee la clase .dark del <html> y aplica el theme MUI correspondiente.
 */
function getMuiTheme(dark: boolean) {
  return createTheme({
    palette: {
      mode: dark ? "dark" : "light",
      primary: {
        main: dark ? "#4d9aff" : "#3483fa",
      },
      background: {
        default: dark ? "#121212" : "#ebebeb",
        paper: dark ? "#1e1e1e" : "#ffffff",
      },
    },
    components: {
      MuiSkeleton: {
        styleOverrides: {
          root: {
            backgroundColor: dark ? "#333" : "#e5e5e5",
          },
        },
      },
      MuiBadge: {
        styleOverrides: {
          badge: {
            backgroundColor: dark ? "#4d9aff" : "#3483fa",
            color: "#fff",
          },
        },
      },
    },
  });
}

export function MuiSyncProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const check = () => {
      setDark(document.documentElement.classList.contains("dark"));
    };
    check();

    const observer = new MutationObserver(check);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <MuiThemeProvider theme={getMuiTheme(dark)}>{children}</MuiThemeProvider>
  );
}
