import styles from "./index.module.scss"
import { Link } from "react-router-dom"

export function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <em style={{ color: "darkcyan" }}>Cyan</em>&lsquo;s fun
          page.
        </h1>

        <p className={styles.description}>
          Get starting by <code className={styles.code}>Rsbuild</code>
        </p>

        <div className={styles.grid}>
          <Link to="/games/game-of-life" className={styles.card}>
            <h2>Game of Life &rarr;</h2>
            <p>Yeah, the Game of Life you know.</p>
          </Link>
          <Link to="/games/ursus" className={styles.card}>
            <h2>Ursus &rarr;</h2>
            <p>A themed tetris game, maybe.</p>
          </Link>
          <Link to="/sticky" className={styles.card}>
            <h2>Sticky Position &rarr;</h2>
            <p>It made a cool effect, isn&#39;t it?</p>
          </Link>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://rsbuild.dev/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by Rsbuild
        </a>
      </footer>
    </div>
  )
}
