"use client";
import { WagmiProvider } from "wagmi";
import { config } from "@/providers/web3";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider } from "connectkit";
import { ThemeProvider } from "@/context/ThemeContext";
import { SoundProvider } from "@/context/SoundContext";
import { MemoryProvider } from "@/context/MemoryContext";
import LayoutClient from "@/components/layoutClient";

const queryClient = new QueryClient(); // <-- outside the function

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <ConnectKitProvider>
          <SoundProvider>
            <ThemeProvider>
              <MemoryProvider>
                <LayoutClient>{children}</LayoutClient>
              </MemoryProvider>
            </ThemeProvider>
          </SoundProvider>
        </ConnectKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}
