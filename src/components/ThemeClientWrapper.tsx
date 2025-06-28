"use client";

import { useEffect } from "react";

const themes = ["dark", "iris", "matrix", "pepe"];

export const ThemeClientWrapper = ({ children }: { children: React.ReactNode }) => {
   // Remove any previously applied theme classes from <body> so that the landing
  // section always renders without a theme. The actual theme is applied inside
  // the uploader section.

  useEffect(() => {
    if (typeof document !== "undefined") {
      themes.forEach(t => document.body.classList.remove(t));
    }
  }, []);


  return <>{children}</>;
};
