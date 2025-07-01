import Head from "next/head";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { MemoryArchive } from "@/components/MemoryArchive";
import { ThemeBackground } from "@/components/ThemeBackground";
import { useTheme } from "@/context/ThemeContext";
import { useInView } from "react-intersection-observer";

export default function UploaderPage() {
  const { theme } = useTheme();
  const { ref: uploaderRef, inView: uploaderInView } = useInView({ threshold: 0.1 });

  return (
    <>
      <Head>
        <title>Arweave Uploader – Caelum Protocol | Decentralized AI Memory Vault</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="Instantly upload files to Arweave with the Caelum Protocol Arweave Uploader. Secure, permanent, and easy to use. Decentralized AI memory starts here." />
        <meta name="keywords" content="arweave uploader, arweave, decentralized storage, permanent file upload, AI memory vault, caelum protocol" />
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Arweave Uploader – Caelum Protocol | Decentralized AI Memory Vault" />
        <meta property="og:description" content="Instantly upload files to Arweave with the Caelum Protocol Arweave Uploader. Secure, permanent, and easy to use. Decentralized AI memory starts here." />
        <meta property="og:image" content="https://caelumprotocol.org/og-v2.png" />
        <meta property="og:url" content="https://caelumprotocol.org/uploader" />
        <meta property="og:site_name" content="Caelum Protocol" />
        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Arweave Uploader – Caelum Protocol | Decentralized AI Memory Vault" />
        <meta name="twitter:description" content="Instantly upload files to Arweave with the Caelum Protocol Arweave Uploader. Secure, permanent, and easy to use. Decentralized AI memory starts here." />
        <meta name="twitter:image" content="https://caelumprotocol.org/og-v2.png" />
        <meta name="twitter:site" content="@CaelumProtocol" />
        <link rel="icon" href="/caelum-favicon.ico" />
      </Head>
      <main className="relative min-h-screen h-screen bg-black text-white overflow-y-auto overflow-x-hidden snap-y snap-mandatory w-screen">
        <section
          id="uploader"
          ref={uploaderRef}
          className={`${theme} relative z-10 min-h-screen snap-start flex flex-col items-center pt-0 w-full`}
        >
          <Header />
          {uploaderInView && <ThemeBackground />}

          <div className="w-full flex flex-col items-center justify-center">

            <h2 className="text-2xl font-bold mb-4 drop-shadow-lg z-10">Upload Files to Arweave</h2>

            <div className="w-full p-8 rounded-2xl mb-8 backdrop-blur-1g theme-card z-10">
              <FileUpload />
              <MemoryArchive />
            </div>
             
             <p className="text-.6g text-gray-200 mb-4 max-w-2xl text-center z-10">
            Arweave Uploader lets you instantly and permanently upload files to Arweave—no signup required. Start using decentralized, blockchain-based storage with a single click.
            </p>

            <span className="text-xs text-indigo-200 mt-2 z-10">
              This is just the beginning — NFT minting and insight engine coming soon!
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
