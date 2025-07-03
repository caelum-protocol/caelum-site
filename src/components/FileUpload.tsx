"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
import WebUploader from "@irys/web-upload";
import {
  WebEthereum,
  WebMatic,
  WebUSDCPolygon,
  WebArbitrum,
  WebBNB,
  WebAvalanche,
} from "@irys/web-upload-ethereum";
import WebBase from "@irys/web-upload-ethereum";
import WebOptimism from "@irys/web-upload-ethereum";
import { EthersV6Adapter } from "@irys/web-upload-ethereum-ethers-v6";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import Dropzone from "@/components/Dropzone";
import { UploadButton } from "@/components/UploadButton";
import MetadataPreview from "@/components/MetadataPreview";
import { useMemory } from "@/context/MemoryContext";
import type { MemoryEntry } from "@/types/memory";

// --- List of supported tokens/networks for Irys
const SUPPORTED_TOKENS = [
  {
    symbol: "MATIC",
    name: "Polygon MATIC",
    id: "matic",
    chainId: 137,
    tokenClass: WebMatic,
    rpc: "https://polygon-rpc.com",
  },
  {
    symbol: "USDC",
    name: "Polygon USDC",
    id: "usdc_polygon",
    chainId: 137,
    tokenClass: WebUSDCPolygon,
    rpc: "https://polygon-rpc.com",
  },
  {
    symbol: "ETH",
    name: "Ethereum Mainnet",
    id: "eth_mainnet",
    chainId: 1,
    tokenClass: WebEthereum,
    rpc: "https://eth-mainnet.g.alchemy.com/v2/demo",
  },
  {
    symbol: "ETH",
    name: "Arbitrum One",
    id: "eth_arbitrum",
    chainId: 42161,
    tokenClass: WebArbitrum,
    rpc: "https://arb1.arbitrum.io/rpc",
  },
  {
    symbol: "ETH",
    name: "Optimism",
    id: "eth_optimism",
    chainId: 10,
    tokenClass: WebOptimism,
    rpc: "https://mainnet.optimism.io",
  },
  {
    symbol: "BNB",
    name: "BNB Chain",
    id: "bnb",
    chainId: 56,
    tokenClass: WebBNB,
    rpc: "https://bsc-dataseed.binance.org",
  },
  {
    symbol: "AVAX",
    name: "Avalanche",
    id: "avax",
    chainId: 43114,
    tokenClass: WebAvalanche,
    rpc: "https://api.avax.network/ext/bc/C/rpc",
  },
  {
    symbol: "ETH",
    name: "Base",
    id: "eth_base",
    chainId: 8453,
    tokenClass: WebBase,
    rpc: "https://mainnet.base.org",
  },
];

export const FileUpload = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const [selectedTokenIdx, setSelectedTokenIdx] = useState(0); // MATIC is default
  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address,
    chainId: SUPPORTED_TOKENS[selectedTokenIdx].chainId,
  });
  const userBalance = balanceData?.value ?? 0n;

  const [file, setFile] = useState<File | null>(null);
  const [uploadStatus, setUploadStatus] = useState("");
  const [uploadCost, setUploadCost] = useState("");
  const [insufficientFunds, setInsufficientFunds] = useState(false);
  const [uploadUrl, setUploadUrl] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [txId, setTxId] = useState("");
  const { addMemory } = useMemory();

  const [irysUploader, setIrysUploader] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");

  // --- Network auto-switch logic
  const switchToChain = async (targetChainId: number) => {
    const hexChainId = "0x" + targetChainId.toString(16);
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }],
      });
      return true;
    } catch (err: any) {
      toast.error("Chain switch rejected or failed. Please switch manually.");
      return false;
    }
  };

  // --- Irys uploader setup: per-token/chain
  useEffect(() => {
    async function initIrys() {
      setIrysUploader(null);
      setErrorMsg("");
      if (!isConnected) return;

      const token = SUPPORTED_TOKENS[selectedTokenIdx];
      if (chainId !== token.chainId) {
        const switched = await switchToChain(token.chainId);
        if (!switched) {
          setErrorMsg(
            `Please switch wallet to ${token.name} (chain ${token.chainId}).`
          );
          return;
        }
      }
      if (!window.ethereum) {
        setErrorMsg("No injected wallet found (window.ethereum missing).");
        return;
      }
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);

        const uploader = await WebUploader(token.tokenClass)
          .withAdapter(EthersV6Adapter(provider))
          .withRpc(token.rpc)
          .mainnet();

        setIrysUploader(uploader);
      } catch (err: any) {
        setErrorMsg(err.message || "Irys initialization failed");
      }
    }
    initIrys();
    // re-run if token or network changes
  }, [isConnected, chainId, selectedTokenIdx]);

  // --- Dropzone: File drop and price estimation ---
  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setFile(null);
      setUploadCost("");
      setUploadStatus("");
      setInsufficientFunds(false);

      if (!acceptedFiles.length) return;
      if (!irysUploader) {
        setUploadStatus("Uploader not ready.");
        return;
      }

      const selectedFile = acceptedFiles[0];
      setFile(selectedFile);
      setUploadStatus("Getting upload cost...");

      try {
        const priceAtomic = await irysUploader.getPrice(selectedFile.size);
        const priceBigInt = BigInt(priceAtomic.toString());
        const priceHuman = irysUploader.utils.fromAtomic(priceAtomic).toString();
        setUploadCost(priceHuman);

        if (userBalance < priceBigInt) {
          setInsufficientFunds(true);
          setUploadStatus("Insufficient funds for upload");
        } else {
          setInsufficientFunds(false);
          setUploadStatus("Ready to upload");
        }
      } catch (e) {
        setUploadStatus("Failed to estimate upload: " + (e as Error).message);
        setUploadCost("");
        toast.error("Upload price estimation failed: " + (e as Error).message);
      }
    },
    [irysUploader, userBalance]
  );

  // --- Upload flow (fund + upload) ---
  const handleUpload = async () => {
    if (!file) return toast.error("No file selected.");
    if (!irysUploader) {
      toast.error("Uploader not ready.");
      setUploadStatus("Uploader not ready.");
      return;
    }
    if (insufficientFunds) {
      toast.error("Insufficient balance.");
      setUploadStatus("Insufficient balance.");
      return;
    }

    try {
      setUploadStatus("Uploading...");

      // Re-calc upload price
      const buffer = await file.arrayBuffer();
      const priceAtomic = await irysUploader.getPrice(buffer.byteLength);
      const priceBigInt = BigInt(priceAtomic.toString());

      if (userBalance < priceBigInt) {
        setInsufficientFunds(true);
        setUploadStatus("Insufficient balance.");
        return;
      }

      await irysUploader.fund(priceAtomic);
      setUploadStatus("Uploading to Irys...");

      const receipt = await irysUploader.uploadFile(file, {
        tags: [{ name: "Content-Type", value: file.type }],
      });

      setTxId(receipt.id);
      setUploadUrl(`https://gateway.irys.xyz/${receipt.id}`);
      setUploadStatus("Upload complete!");

      const memory: MemoryEntry = {
        fileName: file.name,
        size: file.size.toString(),
        type: file.type,
        uploadedAt: new Date().toISOString(),
        txId: receipt.id,
        url: `https://gateway.irys.xyz/${receipt.id}`,
        note: note.trim() || undefined,
        isNew: true,
      };

      addMemory(memory);

      setTimeout(() => {
        setFile(null);
        setUploadStatus("");
        setUploadCost("");
        setTxId("");
        setNote("");
        setUploadUrl(null);
      }, 2000);
      await refetchBalance?.();
    } catch (e: any) {
      setUploadStatus(`Error: ${e.message}`);
      toast.error("Upload failed: " + e.message);
    }
  };

  // --- UI ---
  return (
    <div className="relative">
      {/* Token select menu - dark theme */}
      <div className="flex justify-center mb-4">
        <select
          value={selectedTokenIdx}
          onChange={e => setSelectedTokenIdx(Number(e.target.value))}
          className="px-4 py-2 rounded-xl bg-gray-900 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow"
        >
          {SUPPORTED_TOKENS.map((tok, i) => (
            <option key={tok.id} value={i}>
              {tok.name} ({tok.symbol})
            </option>
          ))}
        </select>
      </div>

      {errorMsg && (
        <div className="text-red-400 mb-2 font-bold">{errorMsg}</div>
      )}

      <Dropzone onDrop={onDrop} />

      {file && irysUploader && (
        <div className="mt-6 space-y-4 max-w-xl mx-auto text-white">
          <MetadataPreview
            fileName={file.name}
            type={file.type}
            size={file.size}
            cost={uploadCost}
          />
          <input
            type="text"
            placeholder="Add a note..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            className="w-full rounded border px-3 py-2 text-black"
          />
          <div className="mb-2">{uploadStatus}</div>
          {insufficientFunds && (
            <div className="text-red-500 font-semibold">
              Insufficient {SUPPORTED_TOKENS[selectedTokenIdx].symbol} for upload
            </div>
          )}
          <div className="text-center">
            <UploadButton
              onClick={handleUpload}
              disabled={
                !uploadCost ||
                insufficientFunds ||
                uploadStatus.includes("Uploading")
              }
            />
          </div>
        </div>
      )}

      {uploadUrl && (
        <div className="mt-4 break-all text-center">
          <span className="font-bold text-green-400">Success!</span>{" "}
          <a
            href={uploadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline text-blue-300"
          >
            View file
          </a>
        </div>
      )}
    </div>
  );
};
