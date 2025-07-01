import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import { MemoryProvider } from "@/context/MemoryContext";
import LayoutClient from "@/components/layoutClient";
import { ReactNode } from "react";

export function SSRProviders({ children }: { children: ReactNode }) {
  return (
    <SoundProvider>
      <ThemeProvider>
        <MemoryProvider>
          <LayoutClient>{children}</LayoutClient>
        </MemoryProvider>
      </ThemeProvider>
    </SoundProvider>
  );
}

export function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SoundProvider>
      <ThemeProvider>
        <MemoryProvider>
          <LayoutClient>{children}</LayoutClient>
        </MemoryProvider>
      </ThemeProvider>
    </SoundProvider>
  );
}