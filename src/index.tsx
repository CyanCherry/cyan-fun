import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import "katex/dist/katex.min.css"
import "./index.scss"
import { Notes } from "@/pages/Notes"
import { Sticky } from "@/pages/sticky"
import { _404 } from "./pages/404"
import { LifeGame } from "./pages/games/game-of-life"
import { Ursus } from "./pages/games/ursus"
import { Home } from "./pages/Home"

const rootElement = document.getElementById("root")

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement)

  root.render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/notes/*" element={<Notes />} />
          <Route path="/games/game-of-life" element={<LifeGame />} />
          <Route path="/games/ursus" element={<Ursus />} />
          <Route path="/sticky" element={<Sticky />} />
          <Route path="*" element={<_404 />} />
        </Routes>
      </BrowserRouter>
    </React.StrictMode>,
  )
}
