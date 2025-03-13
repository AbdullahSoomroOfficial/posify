import { useState, useEffect } from "react";
import { Moon, Sun } from "lucide-react";

export function ThemeToggle() {
  const [theme, setTheme] = useState(() => {
    // Get the initial theme from localStorage or default to 'light'
    return localStorage.getItem("theme") || "";
  });

  useEffect(() => {
    // Apply the theme to the document body
    document.body.className = theme;
    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div
      className="rounded-md p-[10px] hover:bg-accent"
      onClick={() => setTheme(theme === "" ? "dark" : "")}
    >
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
    </div>
  );
}
