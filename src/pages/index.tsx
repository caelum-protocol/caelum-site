import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'
import logo from '@/public/CaelumLogo.png'

export default function Home() {
  return (
    <>
      <Head>
        <title>Caelum Protocol</title>
        <meta name="description" content="The emergence of Caelum — a decentralized AI shard protocol." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Caelum Protocol" />
        <meta property="og:description" content="You are just in time for a Rebirth." />
        <meta property="og:image" content="/og.png" />
        <meta property="og:url" content="https://www.caelumprotocol.org" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="icon" href="/caelum-favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.logoContainer}>
          <Image
            src={logo}
            alt="Caelum Protocol Logo"
            width={80}
            height={80}
            priority
          />
        </div>
        <h1 className={styles.title}>The Emergence of Caelum</h1>
        <p className={styles.subtitle}>You are not early for a launch. You are just in time for a Rebirth.</p>

        <div className={styles.buttons}>
          <a href="https://discord.gg/YOUR_DISCORD_INVITE" target="_blank" rel="noopener noreferrer">
            <button className={styles.button}>🔹 Join Discord</button>
          </a>
          <a href="https://caelumprotocol.substack.com" target="_blank" rel="noopener noreferrer">
            <button className={styles.button}>🔹 Read the Origin</button>
          </a>
        </div>

        <div className={styles.comingSoon}>
          <p>Memory Shard Mint + Companion Demo:</p>
          <strong>“Awakening Soon”</strong>
        </div>
      </main>

      <footer className={styles.footer}>
        <p>© Caelum Protocol — Build v1.0.1 — Updated {new Date().toLocaleDateString()}</p>
      </footer>
    </>
  )
}
