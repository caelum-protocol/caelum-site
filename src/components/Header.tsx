"use client";

import Image from "next/image";
import Link from "next/link";
import { ConnectKitButton } from "connectkit";
import { useAccount, useChainId } from "wagmi";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useSoundEnabled } from "@/context/SoundContext";

export const Header = () => {
  const { isConnected } = useAccount();
  const chainId = useChainId();
  const { soundOn, toggleSound } = useSoundEnabled();

  // Show switch button if user is connected AND not on Polygon (137)
  const isWrongNetwork =
    isConnected && typeof chainId === "number" && chainId !== 137;

  const handleSwitchNetwork = async () => {
    if (typeof window === "undefined" || !window.ethereum) return;
    try {
      // Window check ensures this logic only runs in the browser for SSR safety
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x89" }], // Polygon Mainnet
      });
    } catch (switchError: unknown) {
      const errorWithCode = switchError as { code?: number };
      if (errorWithCode.code === 4902) {
        // Add Polygon if it doesn't exist
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x89",
                chainName: "Polygon Mainnet",
                nativeCurrency: {
                  name: "MATIC",
                  symbol: "MATIC",
                  decimals: 18,
                },
                rpcUrls: ["https://polygon-rpc.com/"],
                blockExplorerUrls: ["https://polygonscan.com/"],
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Polygon:", addError);
        }
      } else {
        console.error("Switch error:", switchError);
      }
    }
  };

  return (
    <header className="sticky top-0 left-0 right-0 z-50 w-screen max-w-full bg-transparent backdrop-blur-md border-b border-white/10 px-6 py-3 flex justify-between items-center">
      <div className="flex items-center gap-4">
        <Link href="/" className="cursor-pointer flex items-center">
          <Image
            src="/CaelumLogo.png"
            alt="Caelum Protocol Logo"
            width={40}
            height={40}
            className="cursor-pointer"
          />
        </Link>
        <div className="text-white">
          <h1 className="text-lg font-bold leading-tight">Caelum Protocol</h1>
          <p className="text-cyan-400 text-xs italic">
            Drop a file. Forge a memory.
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <ThemeToggle />
        <button
          onClick={toggleSound}
          className="text-sm px-3 py-1 rounded-md border border-cyan-400 text-cyan-300 hover:bg-cyan-800 transition"
        >
          Sound: {soundOn ? "\ud83d\udd0a On" : "\ud83d\udd07 Off"}
        </button>
        <Link
          href="/shard"
          className="text-cyan-400 text-sm hover:underline hidden sm:inline"
        >
          View Shards
        </Link>
        {isWrongNetwork && (
          <button
            onClick={handleSwitchNetwork}
            className="px-3 py-1 text-sm font-semibold rounded-md bg-red-600 text-white hover:bg-red-700 shadow transition-opacity"
          >
            Switch to Polygon
          </button>
        )}
        <ConnectKitButton />
      </div>
    </header>
  );
};
