import styles from "./index.module.scss"

export default function Sticky() {
  return (
    <div className={styles.container}>
      <div className={styles.screen}>
        <span>1</span>
      </div>
      <div className={styles.screen}>
        <span>2</span>
      </div>
      <div className={styles.screen}>
        <span>3</span>
      </div>
      <div className={styles.screen}>
        <span>4</span>
      </div>
      <div className={styles.screen}>
        <span>5</span>
      </div>
      <div className={styles.screen}>
        <span>6</span>
      </div>
      <div className={styles.screen}>
        <span>7</span>
      </div>
    </div>
  )
}