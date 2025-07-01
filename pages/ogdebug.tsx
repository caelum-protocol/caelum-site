// pages/ogdebug.tsx
import Head from "next/head";

export default function OGDebug() {
  return (
    <>
      <Head>
        <title>OG Debug Title</title>
        <meta property="og:title" content="OG Debug Title" />
        <meta property="og:description" content="This is an SSR meta tag test." />
        <meta property="og:image" content="https://caelumprotocol.org/og-v2.png" />
      </Head>
      <div>OG SSR Debug Page</div>
    </>
  );
}

export async function getServerSideProps() {
  return { props: {} };
}