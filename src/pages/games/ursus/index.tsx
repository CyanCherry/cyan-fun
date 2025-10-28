import styles from "./index.module.scss"
import { Component } from "react"
import { ERR_CELL_NOT_EMPTY, ERR_OUT_OF_PANEL, Shape } from "./shape/Shape"
import { shapeCollections } from "./shape"
import {
  ALL_KEYS,
  ANIMATION_DURATION,
  HEIGHT,
  LEFT_KEYS,
  QUICK_DOWN_KEYS,
  RIGHT_KEYS,
  SPIN_KEYS,
  STEP,
  WIDTH,
} from "./configure"
import { matrix, random } from "@/utils/array"

export type Panel = (string | null)[][]
type Status = "idle" | "gaming" | "over"

type State = {
  next: Shape
  active: Shape | null
  solidPanel: Panel
  score: number
  status: Status
}

export class Ursus extends Component<unknown, State> {
  override state: State = {
    next: shapeCollections[0][0],
    active: null,
    solidPanel: matrix({ height: HEIGHT, width: WIDTH, value: null }),
    score: 0,
    status: "idle",
  }
  timer: number | undefined

  constructor(props: unknown) {
    super(props)
    this.round = this.round.bind(this)
    this.resetGame = this.resetGame.bind(this)
    this.onKeydown = this.onKeydown.bind(this)
  }

  round() {
    if (!this.state.active) {
      let newActive = this.state.next
      const spinTimes = ~~(Math.random() * 4)
      for (let i = 0; i < spinTimes; i++) {
        newActive = newActive.spin()
      }
      while (newActive.blocks.some((block) => block.y >= 0)) {
        newActive = newActive.up()
      }
      this.setState({
        next: random(random(shapeCollections)),
        active: newActive,
      })
      return
    }
    try {
      const down = this.state.active.down()
      down.print(this.state.solidPanel)
      this.setState({
        active: down,
      })
      new Audio("/sounds/mixkit-arcade-game-jump-coin-216.wav")
        .play()
        .catch(console.error)
    } catch (e) {
      if (e === ERR_CELL_NOT_EMPTY || e === ERR_OUT_OF_PANEL) {
        const newSolidPanel = this.state.active.print(this.state.solidPanel)
        if (this.state.active.blocks.some((block) => block.y < 0)) {
          clearInterval(this.timer)
          this.setState({
            status: "over",
            active: null,
            solidPanel: newSolidPanel,
          })
          return
        }
        const completedRows = [
          ...new Set(this.state.active.blocks.map((block) => block.y)),
        ].filter((row) => {
          return newSolidPanel[row].every((cell) => cell != null)
        })
        if (completedRows.length) {
          clearInterval(this.timer)
          this.setState({
            score: this.state.score + 100 * completedRows.length ** 2,
          })
          setTimeout(() => {
            const panel = [...newSolidPanel]
            new Audio("/sounds/mixkit-retro-game-notification-212.wav")
              .play()
              .catch(console.error)
            completedRows
              .sort((a, b) => b - a)
              .forEach((row) => {
                panel.splice(row, 1)
              })
            while (panel.length < HEIGHT) {
              panel.unshift(new Array(WIDTH).fill(null))
            }
            this.setState({
              solidPanel: panel,
            })
          }, ANIMATION_DURATION / 2)
          // todo animation
          this.timer = setTimeout(() => {
            this.timer = setInterval(() => {
              this.round()
            }, STEP)
          }, ANIMATION_DURATION)
        }
        this.setState({
          active: null,
          solidPanel: newSolidPanel,
        })
      } else {
        throw e
      }
    }
  }

  resetGame() {
    this.setState({
      status: "gaming",
      solidPanel: matrix({
        height: HEIGHT,
        width: WIDTH,
        value: null,
      }),
    })
    this.timer = setInterval(() => {
      this.round()
    }, STEP)
  }

  onKeydown(event: KeyboardEvent) {
    if (event.ctrlKey || event.altKey || event.metaKey) {
      return
    }
    if (ALL_KEYS.includes(event.key)) {
      event.preventDefault()
      if (!this.state.active) {
        return
      }
      if (LEFT_KEYS.includes(event.key)) {
        try {
          const left = this.state.active.left()
          left.print(this.state.solidPanel)
          this.setState({
            active: left,
          })
        } catch (e) {
          if (e === ERR_OUT_OF_PANEL || e === ERR_CELL_NOT_EMPTY) {
            console.log("left failed")
          } else {
            throw e
          }
        }
      } else if (RIGHT_KEYS.includes(event.key)) {
        try {
          const right = this.state.active.right()
          right.print(this.state.solidPanel)
          this.setState({
            active: right,
          })
        } catch (e) {
          if (e === ERR_OUT_OF_PANEL || e === ERR_CELL_NOT_EMPTY) {
            console.log("right failed")
          } else {
            throw e
          }
        }
      } else if (QUICK_DOWN_KEYS.includes(event.key)) {
        this.round()
      } else if (SPIN_KEYS.includes(event.key)) {
        let spin = this.state.active.spin()
        while (spin.blocks.some((block) => block.x < 0)) {
          spin = spin.right()
        }
        while (spin.blocks.some((block) => block.x >= WIDTH)) {
          spin = spin.left()
        }
        try {
          this.setState({
            active: spin,
          })
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

  override componentDidMount() {
    this.setState({
      next: random(random(shapeCollections)),
    })
    document.addEventListener("keydown", this.onKeydown)
  }

  override componentWillUnmount() {
    document.removeEventListener("keydown", this.onKeydown)
  }

  override render() {
    const panel = this.state.active
      ? this.state.active.print(this.state.solidPanel)
      : this.state.solidPanel

    //todo UI for showing next shape
    return (
      <div className={styles.container}>
        <div className={styles.next}>{JSON.stringify(this.state.next)}</div>
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
            {this.state.status !== "gaming" && (
              <div className={styles.gameMask}>
                {this.state.status === "idle" && (
                  <button className={styles.button} onClick={this.resetGame}>
                    START
                  </button>
                )}
                {this.state.status === "over" && (
                  <>
                    <span className={styles.scoreText}>GAME OVER</span>
                    <button className={styles.button} onClick={this.resetGame}>
                      RETRY
                    </button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        <div className={styles.score}>
          <span className={styles.scoreText}>
            {this.state.score.toString().padStart(8, "0")}
          </span>
          <div className={styles.scoreBorder}>
            <div
              className={styles.scoreBorderFragment}
              style={{ width: "70%" }}
            />
            <div style={{ width: "5%" }} />
            <div
              className={styles.scoreBorderFragment}
              style={{ width: "10%" }}
            />
          </div>
        </div>
      </div>
    )
  }
}
