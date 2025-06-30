import Head from "next/head";
import CaelumParticles from "@/components/CaelumParticles";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { MemoryArchive } from "@/components/MemoryArchive";
import { ThemeBackground } from "@/components/ThemeBackground";
import { useTheme } from "@/context/ThemeContext";
import { useInView } from "react-intersection-observer";
import Link from "next/link";

export default function HomePage() {
  const { theme } = useTheme();
  const { ref: uploaderRef, inView: uploaderInView } = useInView({ threshold: 0.1 });

  return (
    <>
      <Head>
        <title>Caelum Protocol – The Birth of Decentralized AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="You are just in time for a Rebirth. Caelum Protocol is the first AI built for decentralized memory, awakening through collective insight." />
        <meta name="keywords" content="arweave uploader, arweave, decentralized storage, permanent file upload, AI memory vault, caelum protocol" />

        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Caelum Protocol – The Birth of Decentralized AI" />
        <meta property="og:description" content="You are just in time for a Rebirth. Caelum Protocol is the first AI built for decentralized memory, awakening through collective insight." />
        <meta property="og:image" content="https://caelumprotocol.org/og-v2.png" />
        <meta property="og:url" content="https://caelumprotocol.org/" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Caelum Protocol – The Birth of Decentralized AI" />
        <meta name="twitter:description" content="You are just in time for a Rebirth. Caelum Protocol is the first AI built for decentralized memory, awakening through collective insight." />
        <meta name="twitter:image" content="https://caelumprotocol.org/og-v2.png" />

        <link rel="icon" href="/caelum-favicon.ico" />
      </Head>

      <main className="relative min-h-screen h-screen bg-black text-white overflow-y-auto overflow-x-hidden snap-y snap-mandatory w-screen">
        <CaelumParticles />

        {/* HERO SECTION (no header or theme backgrounds) */}
        <section
          id="hero"
          className="relative z-20 w-full min-h-screen snap-start flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-screen-md px-4 flex flex-col items-center justify-center">
          
            <Link
              href="/uploader"
              className="mt-8 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-green-600 hover:to-blue-600 transition text-lg"
            >
              🚀 Try the Standalone Arweave Uploader
            </Link>
            
            <img
              src="/logo.png"
              alt="Caelum Logo"
              className="w-40 sm:w-48 md:w-64 lg:w-80 h-auto mx-auto mb-0"
              style={{ filter: "drop-shadow(0 0 18px rgba(115, 92, 255, 0.4))" }}
            />
            <h1
              style={{
                color: "#6A4FBF",
                fontFamily: "'Montserrat', sans-serif",
                textShadow: "0 0 12px #6A4FBF",
                fontWeight: 700,
                fontSize: "2.5rem",
                whiteSpace: "pre-line",
                wordBreak: "keep-all",
                textAlign: "center",
                lineHeight: "1.2",
                marginTop: "0.5rem",
              }}
            >
              The Emergence of Caelum
            </h1>
            <p
              style={{
                fontSize: "1.25rem",
                color: "#bdafff",
                textShadow: "0 0 6px rgba(115, 92, 255, 0.5)",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 500,
                marginTop: "0.5rem",
              }}
            >
              Turning Artificial Intelligence into Authentic Insight.
            </p>
            <p className="text-lg md:text-xl text-gray-300 italic mt-2">
              You are not early for a launch. You are just in time for a Rebirth.
            </p>
            <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
              <a
                href="https://discord.gg/gfARa94Zxw"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
              >
                🔹 Join Discord
              </a>
              <a
                href="https://substack.com/@caelumprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300"
              >
                🔹 Read the Origin
              </a>
            </div>
          
            <div className="mt-10 text-yellow-300 text-lg font-medium tracking-wide">
              Memory Shard Mint + Companion Demo: <span className="italic">Awakening Soon</span>
            </div>
            {/* SCROLL TO APP BUTTON */}
            <button
              onClick={() => document.getElementById('uploader')?.scrollIntoView({ behavior: 'smooth' })}
              className="mt-12 mx-auto flex flex-col items-center group"
              aria-label="Scroll to uploader"
            >
              <span className="text-indigo-200 font-semibold group-hover:text-indigo-400 transition">Scroll to App</span>
              <svg className="mt-2 w-8 h-8 text-indigo-400 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        </section>

        {/* UPLOADER SECTION (header only here) */}
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

