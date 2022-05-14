import "../styles/globals.css"
import type { AppProps } from "next/app"
import NextConfig from "@/next.config"

declare global {
  interface Array<T> {
    random(): T
  }
}

Array.prototype.random || (Array.prototype.random = function () {
  return this[~~(this.length * Math.random())]
})

process.env.REACT_STRICT_MODE = String(NextConfig.reactStrictMode)

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}

export default MyApp
