// pages/index.tsx
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import HomeClient for client-side-only UI
const HomeClient = dynamic(() => import("@/components/HomeClient"), { ssr: false });

export default function HomePage() {
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
        <meta property="og:site_name" content="Caelum Protocol" />

        {/* Twitter Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Caelum Protocol – The Birth of Decentralized AI" />
        <meta name="twitter:description" content="You are just in time for a Rebirth. Caelum Protocol is the first AI built for decentralized memory, awakening through collective insight." />
        <meta name="twitter:image" content="https://caelumprotocol.org/og-v2.png" />
        <meta name="twitter:site" content="@CaelumProtocol" />

        <link rel="icon" href="/caelum-favicon.ico" />
      </Head>

      {/* SSR-rendered Hero content for SEO */}
      <main className="relative min-h-screen h-screen bg-black text-white overflow-y-auto overflow-x-hidden snap-y snap-mandatory w-screen">
        <section
          id="hero"
          className="relative z-20 w-full min-h-screen snap-start flex flex-col items-center justify-center"
        >
          <div className="w-full max-w-screen-md px-4 flex flex-col items-center justify-center">
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
          </div>
        </section>
        {/* Client-only UI and effects */}
        <HomeClient />
      </main>
    </>
  );
}

// SSR for meta tags (leave as is)
export async function getServerSideProps() {
  return { props: {} };
}
