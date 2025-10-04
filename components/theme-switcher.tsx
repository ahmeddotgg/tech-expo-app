"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeSwitcher() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      aria-label="Toggle theme"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      size="icon"
      variant="outline"
    >
      <Moon className="!transition-all absolute size-5 rotate-0 scale-100 dark:rotate-90 dark:scale-0" />
      <Sun className="dark:-rotate-0 !transition-all size-5 rotate-90 scale-0 dark:scale-100" />
    </Button>
  );
}
