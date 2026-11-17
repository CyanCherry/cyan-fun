import styles from "./index.module.scss"
import { Link } from "@rspress/core/runtime"

export function _404() {
  return (
    <div className={styles.background}>
      <div className={styles.tip}>
        You are MISSED...
        <Link to="/">
          <span className={styles.home}>go Home?</span>
        </Link>
      </div>
      <div className={styles.container}>
        <div className={styles.lint} />
        <div className={styles.circle} />
      </div>
    </div>
  )
}
