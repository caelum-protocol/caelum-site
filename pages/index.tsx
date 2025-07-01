// pages/index.tsx
import dynamic from "next/dynamic";
import Head from "next/head";

// Dynamically import the HomeClient component with SSR disabled
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
      <HomeClient />
    </>
  );
}

// This ensures SSR for meta tags
export async function getServerSideProps() {
  return { props: {} };
}
