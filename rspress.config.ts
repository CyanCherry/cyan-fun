import { defineConfig } from "@rspress/core"
import { pluginSass } from "@rsbuild/plugin-sass"
import remarkMath from "remark-math"
import rehypeKatex from "rehype-katex"

// eslint-disable-next-line no-restricted-syntax
export default defineConfig({
  root: "docs",
  lang: "zh",
  title: "Cyan's fun",
  description: "Cyan 的学习笔记、小游戏与网页实验。",
  icon: "/favicon.ico",
  globalStyles: "katex/dist/katex.min.css",
  markdown: {
    remarkPlugins: [remarkMath],
    rehypePlugins: [rehypeKatex],
  },
  builderConfig: {
    plugins: [pluginSass()],
    server: { host: "127.0.0.1" },
    output: {
      distPath: "dist",
    },
    html: {
      tags: [
        {
          tag: "link",
          attrs: {
            rel: "stylesheet",
            href: "https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&family=VT323&display=swap",
          },
        },
      ],
    },
  },
})
