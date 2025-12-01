"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      className="p-4 rounded-full bg-secondary text-text fixed bottom-4 right-4 m-4 z-999"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
}
