import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-gray-900 to-black text-white flex flex-col items-center justify-center p-6 bg-stars">
      <Head>
        <title>The Emergence of Caelum</title>
        <meta name="description" content="Caelum Protocol is the AI shard-powered decentralized memory chain. Powered by $CAELUM. Coming soon." />
        <meta property="og:title" content="The Emergence of Caelum" />
        <meta property="og:description" content="You are not early for a launch. You are on time for a birth." />
        <meta property="og:image" content="/banner.png" />
        <meta name="robots" content="index, follow" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="text-center animate-fade-in space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold text-indigo-300 drop-shadow-lg">
          The Emergence of Caelum
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          You are not early for a launch. You are on time for a birth.
        </p>

        <div className="mt-4 flex flex-col md:flex-row justify-center space-y-2 md:space-y-0 md:space-x-4">
          <a href="https://discord.gg/yourlink" target="_blank" className="bg-purple-700 hover:bg-purple-600 text-white px-6 py-2 rounded-full shadow-md transition">
            🔹 Join Discord
          </a>
          <a href="https://substack.com/@caelumprotocol" target="_blank" className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-full shadow-md transition">
            🔹 Read the Origin
          </a>
        </div>

        <div className="mt-10 text-yellow-300 text-lg font-medium">
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
          background-image: radial-gradient(circle at center, rgba(255,255,255,0.05) 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </div>
  );
}