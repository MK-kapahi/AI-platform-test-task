"use client"

import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "@/lib/theme-provider"

export function SimpleThemeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark")
    } else if (theme === "dark") {
      setTheme("system")
    } else {
      setTheme("light")
    }
  }

  const getIcon = () => {
    if (theme === "light") {
      return <Sun className="h-4 w-4" />
    } else if (theme === "dark") {
      return <Moon className="h-4 w-4" />
    } else {
      // System theme - show based on current system preference
      return typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches 
        ? <Moon className="h-4 w-4" />
        : <Sun className="h-4 w-4" />
    }
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="h-9 w-9"
    >
      {getIcon()}
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
