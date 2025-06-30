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
        <meta name="description" content="Instantly upload files to Arweave with the Caelum Protocol Arweave Uploader. Secure, permanent, and easy to use. Decentralized AI memory starts here." />
        {/* ...all OG/Twitter meta tags, as discussed above... */}
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
            {/* SCROLL TO TOP BUTTON */}
            <button
              onClick={() => document.getElementById('hero')?.scrollIntoView({ behavior: 'smooth' })}
              className="mb-8 mx-auto flex flex-col items-center group"
              aria-label="Scroll to top"
            >
              <span className="text-indigo-200 font-semibold group-hover:text-indigo-400 transition">Back to Top</span>
              <svg className="mt-2 w-8 h-8 text-indigo-400 animate-bounce -scale-y-100" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 15l-7-7-7 7" />
              </svg>
            </button>

            <h1 className="text-3xl font-extrabold mb-4 drop-shadow-lg">Arweave Uploader</h1>
            <h2 className="text-2xl font-bold mb-4 drop-shadow-lg">Upload Files to Arweave</h2>

            <div className="w-full p-8 rounded-2xl mb-8 backdrop-blur-1g theme-card z-10">
              <FileUpload />
              <MemoryArchive />
            </div>

            <span className="text-xs text-indigo-200 mt-2">
              This is just the beginning — NFT minting and insight engine coming soon!
            </span>
          </div>
        </section>
      </main>
    </>
  );
}
