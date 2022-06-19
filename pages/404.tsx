import styles from "./404.module.scss"
import Link from "next/link"

function Games() {
  return (
    <div className={styles.background}>
      <div className={styles.tip}>
        You are MISSED...
        <Link href="/">
          <span className={styles.home}>go Home?</span>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.lint}/>
        <div className={styles.circle}/>
      </div>
    </div>
  )
}

export default Games
