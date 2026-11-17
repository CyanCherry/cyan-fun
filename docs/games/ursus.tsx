import { BrowserOnly } from "@rspress/core/runtime"
import { Ursus } from "../../src/pages/games/ursus"

export default function UrsusPage() {
  return <BrowserOnly>{() => <Ursus />}</BrowserOnly>
}

export const frontmatter = { pageType: "custom", title: "Ursus" }
