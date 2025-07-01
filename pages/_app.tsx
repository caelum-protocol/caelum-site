import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { SoundProvider } from "@/context/SoundContext";
import { ThemeProvider } from "@/context/ThemeContext";
import { MemoryProvider } from "@/context/MemoryContext";
import LayoutClient from "@/components/layoutClient";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SoundProvider>
      <ThemeProvider>
        <MemoryProvider>
          <LayoutClient>
            <Component {...pageProps} />
          </LayoutClient>
        </MemoryProvider>
      </ThemeProvider>
    </SoundProvider>
  );
}
