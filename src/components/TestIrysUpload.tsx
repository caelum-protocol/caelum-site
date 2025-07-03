"use client";
import { useState, useEffect } from "react";
import { useAccount, useChainId } from "wagmi";
import WebUploader from "@irys/web-upload";
import { WebMatic } from "@irys/web-upload-ethereum";
import { EthersV6Adapter } from "@irys/web-upload-ethereum-ethers-v6";
import { ethers } from "ethers";
import { ConnectKitButton } from "connectkit";

export default function IrysUploadTest() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();

  const [irysUploader, setIrysUploader] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [resultMsg, setResultMsg] = useState<string>("");

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

        // 👇 This is the most current, supported v6 adapter pattern:
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

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMsg("");
    setResultMsg("");
    const file = e.target.files?.[0];
    if (!file || !irysUploader) return;
    try {
      // 1. Estimate upload price
      const priceAtomic = await irysUploader.getPrice(file.size);
      const priceMatic = irysUploader.utils.fromAtomic(priceAtomic);
      setResultMsg(`Upload cost: ${priceMatic} MATIC`);
      // 2. Upload
      const receipt = await irysUploader.uploadFile(file, {
        tags: [{ name: "Content-Type", value: file.type }],
      });
      setResultMsg(`Upload successful! TxID: ${receipt.id}`);
    } catch (err: any) {
      setErrorMsg(err.message || "Upload failed.");
    }
  };

  return (
    <div style={{ padding: 32 }}>
      <ConnectKitButton />
      <input type="file" onChange={handleFileChange} disabled={!irysUploader} />
      {resultMsg && <div style={{ color: "green", marginTop: 12 }}>{resultMsg}</div>}
      {errorMsg && <div style={{ color: "red", marginTop: 12 }}>{errorMsg}</div>}
    </div>
  );
}
