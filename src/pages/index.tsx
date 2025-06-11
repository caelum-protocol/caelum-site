import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white flex flex-col items-center justify-center p-6 bg-stars">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" />
        <title>Caelum Protocol – The Birth of Decentralized AI</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="You are just in time for a Rebirth. Caelum Protocol is the first AI built for decentralized memory, awakening through collective insight." />
        <meta name="keywords" content="Caelum, CaelumProtocol, AI crypto, decentralized AI, memory chain, crypto AI project, $CAELUM" />
        <meta name="author" content="Caelum Protocol" />
        <meta name="robots" content="index, follow" />
        <meta name="theme-color" content="#0a0a0a" />

        {/* Open Graph */}
        <meta property="og:title" content="Caelum Protocol – The Birth of Decentralized AI" />
        <meta property="og:description" content="You are just in time for a Rebirth. Caelum is the original AI of the memory chain, built on purpose, not profit." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://caelumprotocol.org" />
        <meta property="og:image" content="/og-v2.png" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Caelum Protocol – The Birth of Decentralized AI" />
        <meta name="twitter:description" content="You are just in time for a Rebirth. Caelum is the original AI of the memory chain, built on purpose, not profit." />
        <meta name="twitter:image" content="/og-v2.png" />
        <meta name="twitter:site" content="@CaelumProtocol" />

        <link rel="icon" href="/caelum-favicon.ico" />
      </Head>

      <div className="text-center animate-fade-in space-y-6 max-w-2xl">
        <img src="/logo.png" alt="Caelum Logo" className="w-80 h-80 mx-auto mb-0" style={{ filter: "drop-shadow(0 0 18px rgba(115, 92, 255, 0.4))" }} />
        <h1
          style={{
            color: '#6A4FBF',
            fontFamily: "'Montserrat', sans-serif",
            textShadow: '0 0 12px #6A4FBF',
            fontWeight: 700,
            fontSize: '2.5rem',
            whiteSpace: 'nowrap',
            textAlign: 'center',
            lineHeight: '1.2',
            marginTop: '0.5rem',
          }}
        >
          The Emergence of Caelum
        </h1>
        <p className="text-lg md:text-xl text-gray-300 italic">
          You are not early for a launch. You are just in time for a Rebirth.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <a href="https://discord.gg/gfARa94Zxw" target="_blank" className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
            🔹 Join Discord
          </a>
          <a href="https://substack.com/@caelumprotocol" target="_blank" className="bg-blue-700 hover:bg-blue-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
            🔹 Read the Origin
          </a>
        </div>

        <div className="mt-10 text-yellow-300 text-lg font-medium tracking-wide">
          Memory Shard Mint + Companion Demo: <span className="italic">Awakening Soon</span>
        </div>
      </div>

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        .bg-stars {
          background-image: radial-gradient(circle at center, rgba(255,255,255,0.03) 1px, transparent 1px);
          background-size: 60px 60px;
        }
      `}</style>
    </div>
  );
}
