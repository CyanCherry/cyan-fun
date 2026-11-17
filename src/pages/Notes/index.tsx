import type { MDXContent } from "mdx/types"
import type { MouseEvent } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { _404 } from "@/pages/404"
import meta from "@/pages/Notes/docs/_meta.json"
import CudaDoc from "@/pages/Notes/docs/CUDA.md"
import IndexDoc from "@/pages/Notes/docs/index.md"
import LlmDoc from "@/pages/Notes/docs/LLM.md"
import styles from "./index.module.scss"

const NOTES_COMPONENTS: Record<string, MDXContent> = {
  "": IndexDoc,
  index: IndexDoc,
  LLM: LlmDoc,
  CUDA: CudaDoc,
}

export function Notes() {
  const { "*": splat = "" } = useParams()
  const navigate = useNavigate()
  const normalizedSlug = splat.replace(/\.md$/, "").replace(/\/$/, "")
  const DocComponent = NOTES_COMPONENTS[normalizedSlug]

  if (!DocComponent) {
    return <_404 />
  }

  const handleContentClick = (event: MouseEvent<HTMLElement>) => {
    const target = event.target as HTMLElement | null
    const anchor = target?.closest("a")
    if (!anchor) {
      return
    }
    const href = anchor.getAttribute("href")
    if (!href || href.startsWith("http://") || href.startsWith("https://")) {
      return
    }
    event.preventDefault()
    const nextSlug = href.replace(/^\.\//, "").replace(/\.md$/, "")
    navigate(nextSlug ? `/notes/${nextSlug}` : "/notes/")
  }

  return (
    <div className={styles.layout}>
      <aside className={styles.sidebar}>
        <Link to="/" className={styles.homeLink}>
          &larr; Cyan&lsquo;s fun
        </Link>
        <div className={styles.sectionTitle}>
          <Link
            to="/notes/"
            className={
              normalizedSlug === "" || normalizedSlug === "index"
                ? styles.activeLink
                : undefined
            }
          >
            Happy LLM
          </Link>
        </div>
        <nav className={styles.nav}>
          {meta.map((item) => {
            const isActive = normalizedSlug === item.name
            return (
              <Link
                key={item.name}
                to={`/notes/${item.name}`}
                className={isActive ? styles.activeLink : styles.navLink}
              >
                {item.label}
              </Link>
            )
          })}
        </nav>
      </aside>

      <main className={styles.contentWrapper}>
        <article className={styles.markdown} onClick={handleContentClick}>
          <DocComponent />
        </article>
      </main>
    </div>
  )
}
