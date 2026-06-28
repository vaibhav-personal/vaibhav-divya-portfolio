"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";

import { Moon, Sun } from "lucide-react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // PREVENT HYDRATION ERROR
  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-3 rounded-xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-zinc-100/5 dark:bg-black/5 dark:bg-zinc-100/5 hover:scale-105 transition"
    >
      {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
