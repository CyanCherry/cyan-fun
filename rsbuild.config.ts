import { defineConfig } from "@rsbuild/core"
import { pluginMdx } from "@rsbuild/plugin-mdx"
import { pluginReact } from "@rsbuild/plugin-react"
import { pluginSass } from "@rsbuild/plugin-sass"
import { pluginTypeCheck } from "@rsbuild/plugin-type-check"
import rehypeKatex from "rehype-katex"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"

export default defineConfig({
  plugins: [
    pluginReact(),
    pluginSass(),
    pluginTypeCheck(),
    pluginMdx({
      mdxLoaderOptions: {
        remarkPlugins: [remarkGfm, remarkMath],
        rehypePlugins: [rehypeKatex],
      },
    }),
  ],
  html: {
    title: "Cyan's fun",
    favicon: "./public/favicon.ico",
    tags: [
      {
        tag: "link",
        attrs: {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
      },
      {
        tag: "link",
        attrs: {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "",
        },
      },
      {
        tag: "link",
        attrs: {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Icons&family=Roboto:wght@300;400;500;700&family=VT323&display=swap",
        },
      },
    ],
  },
})
