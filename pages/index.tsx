import type { NextPage } from "next"
import Head from "next/head"
import Image from "next/image"
import styles from "./Home.module.css"
import Link from "next/link"

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Cyan&lsquo;s fun</title>
        <meta name="description" content="Generated by create next app"/>
        <link rel="icon" href="/favicon.ico"/>
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <em style={{ color: "darkcyan" }}>Cyan</em>&lsquo;s fun page.
        </h1>

        <p className={styles.description}>
          Get starting by{" "}
          <code className={styles.code}>next.js</code>
        </p>

        <div className={styles.grid}>
          <Link href="/games/game-of-life">
            <a className={styles.card}>
              <h2>Game of Life &rarr;</h2>
              <p>Yeah, the Game of Life you know.</p>
            </a>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16}/>
          </span>
        </a>
      </footer>
    </div>
  )
}

export default Home
