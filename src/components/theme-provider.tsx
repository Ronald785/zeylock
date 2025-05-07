import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
    children: React.ReactNode;
    defaultTheme?: Theme;
    storageKey?: string;
};

type ThemeProviderState = {
    theme: Theme;
    setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
    theme: "system",
    setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vite-ui-theme",
    ...props
}: ThemeProviderProps) {
    const [theme, _setTheme] = useState<Theme>(() => (localStorage.getItem(storageKey) as Theme) || defaultTheme);

    // wrapper para controlar side‐effect de setar tema
    const setTheme = (newTheme: Theme) => {
        localStorage.setItem(storageKey, newTheme);
        _setTheme(newTheme);
    };

    useEffect(() => {
        const root = window.document.documentElement;
        const mq = window.matchMedia("(prefers-color-scheme: dark)");

        const applyTheme = (t: Theme) => {
            root.classList.remove("light", "dark");
            if (t === "system") {
                root.classList.add(mq.matches ? "dark" : "light");
            } else {
                root.classList.add(t);
            }
        };

        // aplica imediatamente
        applyTheme(theme);

        // se estiver no modo system, escuta mudanças
        if (theme === "system") {
            const onChange = (e: MediaQueryListEvent) => {
                root.classList.remove("light", "dark");
                root.classList.add(e.matches ? "dark" : "light");
            };
            // use addEventListener para browsers modernos
            mq.addEventListener("change", onChange);
            return () => {
                mq.removeEventListener("change", onChange);
            };
        }
        // para dark/light fixos não precisa de cleanup
    }, [theme]);

    const value = { theme, setTheme };

    return (
        <ThemeProviderContext.Provider
            {...props}
            value={value}
        >
            {children}
        </ThemeProviderContext.Provider>
    );
}

export const useTheme = () => {
    const context = useContext(ThemeProviderContext);
    if (!context) {
        throw new Error("useTheme must be used within a ThemeProvider");
    }
    return context;
};
