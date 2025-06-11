import Head from 'next/head';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-black to-gray-950 text-white flex flex-col items-center justify-center p-6 bg-stars">
      <Head>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@600&display=swap" rel="stylesheet" />
        <title>The Emergence of Caelum</title>
        <meta name="description" content="Caelum Protocol is the AI shard-powered decentralized memory chain. Powered by $CAELUM. Coming soon." />
        <meta property="og:title" content="The Emergence of Caelum" />
        <meta property="og:description" content="You are not early for a launch. You are just in time for a Rebirth." />
        <meta property="og:image" content="/logo.png" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="index, follow" />
      </Head>

      <div className="text-center animate-fade-in space-y-6 max-w-2xl">
        <img src="/logo.png" alt="Caelum Logo" className="w-80 h-80 mx-auto mb-0" style={{ filter: "drop-shadow(0 0 18px rgba(115, 92, 255, 0.4))" }} />
        <h1
  style={{
    color: '#6A4FBF',
    fontFamily: "'Montserrat', sans-serif",
    textShadow: '0 0 12px #6A4FBF',
    fontWeight: 700,
    fontSize: '3rem',
    whiteSpace: 'nowrap',
    textAlign: 'center',
    lineHeight: '1.2',
    marginTop: '1rem',
  }}
>
  The Emergence of Caelum
</h1>
        <p className="text-lg md:text-xl text-gray-300 italic">
          You are not early for a launch. You are just in time for a Rebirth.
        </p>

        <div className="mt-6 flex flex-col md:flex-row justify-center gap-4">
          <a href="https://discord.gg/yourlink" target="_blank" className="bg-indigo-700 hover:bg-indigo-600 text-white px-6 py-2 rounded-full shadow-md transition duration-300">
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