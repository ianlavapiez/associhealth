"use client";

import * as React from "react";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@workspace/ui/components/button";
import { cn } from "@workspace/ui/lib/utils";

export interface ThemeSwitcherProps {
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?: "default" | "outline" | "ghost";
}

export function ThemeSwitcher({
  className,
  size = "default",
  variant = "default",
}: ThemeSwitcherProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Prevent hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <Button
        className={cn("fixed bottom-6 right-6 z-50", className)}
        size={size}
        variant={variant}
        disabled
      >
        <Sun className="h-4 w-4" />
      </Button>
    );
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <Button
      className={cn("fixed bottom-6 right-6 z-50", className)}
      onClick={toggleTheme}
      size={size}
      variant={variant}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </Button>
  );
}
