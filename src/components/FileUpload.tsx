"use client";

import { useState, useEffect, useCallback } from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
import WebUploader from "@irys/web-upload";
import { WebMatic } from "@irys/web-upload-ethereum";
import { EthersV6Adapter } from "@irys/web-upload-ethereum-ethers-v6";
import { ethers } from "ethers";
import toast from "react-hot-toast";

import Dropzone from "@/components/Dropzone";
import { UploadButton } from "@/components/UploadButton";
import MetadataPreview from "@/components/MetadataPreview";
import { useMemory } from "@/context/MemoryContext";
import type { MemoryEntry } from "@/types/memory";

export const FileUpload = () => {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const { data: balanceData, refetch: refetchBalance } = useBalance({
    address,
    chainId: 137,
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

  useEffect(() => {
    async function initIrys() {
      setIrysUploader(null);
      setErrorMsg("");
      if (!isConnected) return;
      if (chainId !== 137) {
        setErrorMsg("Please switch wallet to Polygon Mainnet (chain 137).");
        return;
      }
      if (!window.ethereum) {
        setErrorMsg("No injected wallet found (window.ethereum missing).");
        return;
      }
      try {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);

        const uploader = await WebUploader(WebMatic)
          .withAdapter(EthersV6Adapter(provider))
          .withRpc("https://polygon-rpc.com")
          .mainnet();

        setIrysUploader(uploader);
      } catch (err: any) {
        setErrorMsg(err.message || "Irys initialization failed");
      }
    }
    initIrys();
  }, [isConnected, chainId]);

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
        const priceMatic = irysUploader.utils.fromAtomic(priceAtomic).toString();
        setUploadCost(priceMatic);

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

  const handleUpload = async () => {
    if (!file) return toast.error("No file selected.");
    if (!irysUploader) {
      toast.error("Uploader not ready.");
      setUploadStatus("Uploader not ready.");
      return;
    }
    if (insufficientFunds) {
      toast.error("Insufficient MATIC balance.");
      setUploadStatus("Insufficient MATIC balance.");
      return;
    }

    try {
      setUploadStatus("Uploading...");

      const buffer = await file.arrayBuffer();
      const priceAtomic = await irysUploader.getPrice(buffer.byteLength);
      const priceBigInt = BigInt(priceAtomic.toString());

      if (userBalance < priceBigInt) {
        setInsufficientFunds(true);
        setUploadStatus("Insufficient MATIC balance.");
        return;
      }

      await irysUploader.fund(priceAtomic);
      setUploadStatus("Uploading to Irys...");

      const receipt = await irysUploader.uploadFile(file, {
        tags: [{ name: "Content-Type", value: file.type }],
      });

      setTxId(receipt.id);
      const ipfsUrl = `ipfs://${receipt.id}`;
      setUploadUrl(`https://gateway.irys.xyz/${receipt.id}`);
      setUploadStatus("Upload complete!");

      // === Mint Shard ===
      const CAELUM_ADDRESS = "0x059bC7dEE4658b75030E40b0B2E17A22Dd455CDF";
      const SHARD_FORGE_ADDRESS = "0x29316199Fd7aCAb2f9e8d1bD84Babe3501A4fE06";

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      const caelumABI = [
        "function approve(address spender, uint256 amount) public returns (bool)"
      ];
      const forgeABI = [
        "function forgeShard(string memory uri, string memory emotion) public"
      ];

      const tokenContract = new ethers.Contract(CAELUM_ADDRESS, caelumABI, signer);
      const shardForge = new ethers.Contract(SHARD_FORGE_ADDRESS, forgeABI, signer);

      toast("Approving CAELUM...");
      const approveTx = await tokenContract.approve(SHARD_FORGE_ADDRESS, ethers.parseUnits("10", 18));
      await approveTx.wait();

      toast("Minting Shard...");
      const mintTx = await shardForge.forgeShard(ipfsUrl, "raw");
      await mintTx.wait();

      toast.success("🧠 Memory Shard minted!");

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
      toast.error("Upload or minting failed: " + e.message);
    }
  };

  return (
    <div className="relative">
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
              Insufficient MATIC for upload
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
