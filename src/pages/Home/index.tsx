import { Link } from "react-router-dom"
import styles from "./index.module.scss"

export function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <em style={{ color: "darkcyan" }}>Cyan</em>&lsquo;s fun
          page.
        </h1>

        <p className={styles.description}>
          学习笔记、小游戏，还有一些网页实验。
        </p>

        <div className={styles.grid}>
          <Link to="/notes/" className={styles.card}>
            <h2>LLM &rarr;</h2>
            <p>CUDA、NLP、Transformer 的学习记录。</p>
          </Link>
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
        <a href="https://rsbuild.rs/" target="_blank" rel="noopener noreferrer">
          Powered by Rsbuild
        </a>
      </footer>
    </div>
  )
}
