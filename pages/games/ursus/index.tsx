import { NextPage } from "next"
import styles from "./index.module.scss"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { ERR_CELL_NOT_EMPTY, ERR_OUT_OF_PANEL, Shape } from "./shape/Shape"
import { shapeCollections } from "./shape"
import {
  ALL_KEYS,
  ANIMATION_DURATION,
  HEIGHT,
  WIDTH,
  LEFT_KEYS,
  RIGHT_KEYS,
  SPIN_KEYS,
  QUICK_DOWN_KEYS,
  STEP,
} from "./configure"
import { useMountedEffect } from "@/utils/hooks"

export type Panel = (string | null)[][]
type State = "start" | "gaming" | "over"

const Ursus: NextPage = () => {
  const [next, setNext] = useState<Shape>(shapeCollections[0][0])
  const [active, setActive] = useState<Shape>()
  const [solidPanel, setSolidPanel] = useState<Panel>(() => {
    const grids = new Array(HEIGHT)
    for (let i = 0; i < HEIGHT; i++) {
      grids [i] = new Array(WIDTH).fill(null)
    }
    return grids
  })
  const [score, setScore] = useState(0)
  const [state, setState] = useState<State>("start")
  const timer = useRef<NodeJS.Timer | undefined>(undefined)

  // make the starting shape randomly
  // and avoid "content does not match server-rendered HTML" issue
  useEffect(() => {
    setNext(shapeCollections.random().random())
  }, [])

  const round = useCallback(() => {
    if (!active) {
      let newActive = next
      const spinTimes = ~~(Math.random() * 4)
      for (let i = 0; i < spinTimes; i++) {
        newActive = newActive.spin()
      }
      while (newActive.blocks.some(block => block.y >= 0)) {
        newActive = newActive.up()
      }
      setNext(shapeCollections.random().random())
      setActive(newActive)
      return
    }
    try {
      const down = active.down()
      down.print(solidPanel)
      setActive(down)
      new Audio("/sounds/mixkit-arcade-game-jump-coin-216.wav").play().catch(console.error)
    } catch (e) {
      if (e === ERR_CELL_NOT_EMPTY || e === ERR_OUT_OF_PANEL) {
        const newSolidPanel = active.print(solidPanel)
        if (active.blocks.some(block => block.y < 0)) {
          setState("over")
          clearInterval(timer.current)
          setActive(undefined)
          setSolidPanel(newSolidPanel)
          return
        }
        const completedRows = [...new Set(active.blocks.map(block => block.y))].filter(row => {
          return newSolidPanel[row].every(cell => cell != null)
        })
        if (completedRows.length) {
          clearInterval(timer.current)
          setScore(score => score + 100 * completedRows.length ** 2)
          setTimeout(() => {
            const panel = [...newSolidPanel]
            new Audio("/sounds/mixkit-retro-game-notification-212.wav").play().catch(console.error)
            completedRows.sort((a, b) => b - a).forEach(row => {
              panel.splice(row, 1)
            })
            while (panel.length < HEIGHT) {
              panel.unshift(new Array(WIDTH).fill(null))
            }
            setSolidPanel(panel)
          }, ANIMATION_DURATION / 2)
          // todo animation
          timer.current = setTimeout(() => {
            timer.current = setInterval(() => {
              setRoundTrigger(t => !t)
            }, STEP)
          }, ANIMATION_DURATION)
        }
        setActive(undefined)
        setSolidPanel(newSolidPanel)
      } else {
        throw e
      }
    }
  }, [active, next, solidPanel])

  const [roundTrigger, setRoundTrigger] = useState(true)

  useMountedEffect(() => {
    round()
  }, [roundTrigger])

  const startGame = useCallback(() => {
    setState("gaming")
    setSolidPanel(() => {
      const grids = new Array(HEIGHT)
      for (let i = 0; i < HEIGHT; i++) {
        grids [i] = new Array(WIDTH).fill(null)
      }
      return grids
    })
    timer.current = setInterval(() => {
      setRoundTrigger(t => !t)
    }, STEP)
  }, [])


  useEffect(() => {
    if (state !== "gaming") {
      return
    }

    function onKeydown(event: KeyboardEvent) {
      if (event.ctrlKey || event.altKey || event.metaKey) {
        return
      }
      if (ALL_KEYS.includes(event.key)) {
        event.preventDefault()
        if (!active) {
          return
        }
        if (LEFT_KEYS.includes(event.key)) {
          try {
            const left = active.left()
            left.print(solidPanel)
            setActive(left)
          } catch (e) {
            if (e === ERR_OUT_OF_PANEL || e === ERR_CELL_NOT_EMPTY) {
              console.log("left failed")
            } else {
              throw e
            }
          }
        } else if (RIGHT_KEYS.includes(event.key)) {
          try {
            const right = active.right()
            right.print(solidPanel)
            setActive(right)
          } catch (e) {
            if (e === ERR_OUT_OF_PANEL || e === ERR_CELL_NOT_EMPTY) {
              console.log("right failed")
            } else {
              throw e
            }
          }
        } else if (QUICK_DOWN_KEYS.includes(event.key)) {
          setRoundTrigger(t => !t)
        } else if (SPIN_KEYS.includes(event.key)) {
          let spin = active.spin()
          while (spin.blocks.some(block => block.x < 0)) {
            spin = spin.right()
          }
          while (spin.blocks.some(block => block.x >= WIDTH)) {
            spin = spin.left()
          }
          try {
            spin.print(solidPanel)
            setActive(spin)
          } catch (e) {
            if (e === ERR_CELL_NOT_EMPTY || e === ERR_OUT_OF_PANEL) {
              console.log("failed to spin active due to aim cells is not empty")
            } else {
              throw e
            }
          }
        }
      }
    }

    document.addEventListener("keydown", onKeydown)
    return () => {
      document.removeEventListener("keydown", onKeydown)
    }
  }, [active, solidPanel, state])

  const panel: Panel = useMemo(() => {
    return active ? active.print(solidPanel) : solidPanel
  }, [active, solidPanel])

  //todo UI for showing next shape
  return (
    <div className={styles.container}>
      <div className={styles.next}>
        {JSON.stringify(next)}
      </div>
      <div className={styles.border}>
        <div className={styles.game}>
          {panel.map((row, i) => (
            <div key={`${i}${JSON.stringify(row)}`} className={styles.row}>
              {row.map((grid, j) => (
                <div
                  key={`${i}${j}${JSON.stringify(grid)}`}
                  className={styles.cell}
                  style={{ backgroundColor: grid ?? "none" }}
                />
              ))}
            </div>
          ))}
          {(state !== "gaming") &&
            <div className={styles.gameMask}>
              {state === "start" && (
                <button
                  className={styles.button}
                  onClick={startGame}
                >
                  START
                </button>
              )}
              {state === "over" && (
                <>
                  <span className={styles.scoreText}>GAME OVER</span>
                  <button
                    className={styles.button}
                    onClick={startGame}
                  >
                    RETRY
                  </button>
                </>
              )}
            </div>
          }
        </div>
      </div>
      <div className={styles.score}>
        <span className={styles.scoreText}>{score.toString().padStart(8, "0")}</span>
        <div className={styles.scoreBorder}>
          <div className={styles.scoreBorderFragment} style={{ width: "70%" }}/>
          <div style={{ width: "5%" }}/>
          <div className={styles.scoreBorderFragment} style={{ width: "10%" }}/>
        </div>
      </div>
    </div>
  )
}

export default Ursus
