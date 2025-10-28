import React from "react"
import ReactDOM from "react-dom/client"
import { Home } from "./pages/Home"
import "./index.scss"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { _404 } from "./pages/404"
import { LifeGame } from "./pages/games/game-of-life"
import { Ursus } from "./pages/games/ursus"
import { Sticky } from "@/pages/sticky"

const root = ReactDOM.createRoot(document.getElementById("root")!)

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="games/game-of-life" element={<LifeGame />} />
        <Route path="games/ursus" element={<Ursus />} />
        <Route path="sticky" element={<Sticky />} />
        <Route path="*" element={<_404 />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
)
