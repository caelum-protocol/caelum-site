"use client";

import { ThemeName, backgroundImageByTheme } from "@/themeStyles";
import { useTheme } from "@/context/ThemeContext";

// Universal invisible background layer for scroll fix on ALL themes
// Optionally: also show theme image (at z-[-2]) if one exists
export default function BackgroundLayer() {
  const { theme } = useTheme();
  const bg = backgroundImageByTheme[theme as ThemeName];

  return (
    <>
      {/* Always provide the invisible scroll-fix layer */}
      <div className="fixed inset-0 w-screen h-screen z-[-1] pointer-events-none" />
      {/* Optionally, show a background image even further behind */}
      {bg && (
        <div
          className="fixed inset-0 z-[-2] bg-cover bg-no-repeat bg-bottom pointer-events-none"
          style={{ backgroundImage: `url('${bg}')` }}
        />
      )}
    </>
  );
}
