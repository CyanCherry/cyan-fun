import { Button, Slider, Switch } from "@mui/material"
import { useCallback, useEffect, useState } from "react"
import styles from "./index.module.scss"
import { NextPage } from "next"

const NotAMatrixErr = new Error("not a matrix")

const Speeds: Record<number, string> = {
  500: "quick",
  1000: "medium",
  1500: "slow",
}

interface MatrixProps<T> {
  width: number
  height: number
  defaultValue: T
}

function initMatrix<T>({ width, height, defaultValue }: MatrixProps<T>): T[][] {
  return new Array<T[]>(height)
    .fill(new Array<T>(width))
    .map(() => {
      let row: T[] = []
      row.length = width
      row.fill(defaultValue)
      return row
    })
}

const SpeedMarks = Object
  .entries(Speeds)
  .map(([k, v]) => ({
    value: Number(k),
    label: v,
  }))

function evolute(world: boolean[][]): boolean[][] {
  let height = world.length
  if (height == 0) {
    throw NotAMatrixErr
  }
  let width = world[0].length
  if (width == 0) {
    throw NotAMatrixErr
  }
  world.forEach((row) => {
    if (row.length != width) {
      throw NotAMatrixErr
    }
  })

  if (height == 1) {
    let row = [...world[0]]
    let row_tmp = [...world[0]]
    row_tmp[0] = false
    row_tmp[width - 1] = false
    for (let i = 1; i < row_tmp.length - 1; i++) {
      if (row[i] && !(row[i - 1] && row[i + 1])) {
        row_tmp[i] = false
      }
    }
    return [row_tmp]
  }

  let previous_row = [...world[0]]
  for (let i = 0; i < previous_row.length; i++) {
    let live_neighbor_count = Number(world[1][i])
    if (i > 0) {
      live_neighbor_count += Number(world[0][i - 1])
      live_neighbor_count += Number(world[1][i - 1])
    }
    if (i < width - 1) {
      live_neighbor_count += Number(world[0][i + 1])
      live_neighbor_count += Number(world[1][i + 1])
    }
    if (!previous_row[i] && live_neighbor_count == 3) {
      previous_row[i] = true
    }
    if (previous_row[i] && (live_neighbor_count > 3 || live_neighbor_count < 2)) {
      previous_row[i] = false
    }
  }

  for (let r = 1; r < world.length - 1; r++) {
    let row_tmp = [...world[r]]
    for (let c = 0; c < row_tmp.length; c++) {
      let live_neighbor_count = Number(world[r - 1][c]) + Number(world[r + 1][c])
      if (c > 0) {
        live_neighbor_count += Number(world[r][c - 1])
        live_neighbor_count += Number(world[r - 1][c - 1])
        live_neighbor_count += Number(world[r + 1][c - 1])
      }
      if (c < width - 1) {
        live_neighbor_count += Number(world[r][c + 1])
        live_neighbor_count += Number(world[r - 1][c + 1])
        live_neighbor_count += Number(world[r + 1][c + 1])
      }
      if (!row_tmp[c] && live_neighbor_count == 3) {
        row_tmp[c] = true
      }
      if (row_tmp[c] && (live_neighbor_count > 3 || live_neighbor_count < 2)) {
        row_tmp[c] = false
      }
    }
    world[r - 1] = previous_row
    previous_row = row_tmp
  }

  let last_row = [...world[height - 1]]
  for (let i = 0; i < width; i++) {
    let live_neighbor_count = Number(world[height - 2][i])
    if (i > 0) {
      live_neighbor_count += Number(world[height - 1][i - 1])
      live_neighbor_count += Number(world[height - 2][i - 1])
    }
    if (i < width - 1) {
      live_neighbor_count += Number(world[height - 1][i + 1])
      live_neighbor_count += Number(world[height - 2][i + 1])
    }
    if (!last_row[i] && live_neighbor_count == 3) {
      last_row[i] = true
    }
    if (last_row[i] && (live_neighbor_count > 3 || live_neighbor_count < 2)) {
      last_row[i] = false
    }
  }
  world[height - 2] = previous_row
  world[height - 1] = last_row
  return [...world]
}

const LifeGame: NextPage = () => {
  const [height, setHeight] = useState(16)
  const [width, setWidth] = useState(32)
  const [world, setWorld] = useState<boolean[][]>(initMatrix<boolean>({
    width,
    height,
    defaultValue: false,
  }))
  const [step, setStep] = useState(1000)
  const [automata, setAutomata] = useState<NodeJS.Timer | null>(null)

  // reset world on height or width change
  useEffect(() => {
    setWorld((world) => {
      world.length = height
      world.forEach(row => {
        row.length = width
      })
      return [...world]
    })
  }, [height, width])

  const evoluteWorld = useCallback(() => {
    setWorld(evolute(world))
  }, [world])

  const clearWorld = useCallback(() => {
    setWorld(initMatrix({ height, width, defaultValue: false }))
  }, [height, width])

  const turnCell = useCallback((row: number, column: number) => {
    world[row][column] = !world[row][column]
    setWorld([...world])
  }, [world])

  return (
    <div className={styles.pageContainer}>
      <h1 className={styles.title}>
        Game of Life
      </h1>
      <div className={styles.main}>
        <div className={styles.world}>
          {
            world.map((row, rowIndex) => (
              <div className={styles.row} key={`row-${rowIndex}`}>
                {
                  row.map((cell, index) => (
                    <div
                      data-alive={cell}
                      className={styles.cell}
                      key={`cell-${rowIndex}-${index}`}
                      onClick={() => {
                        turnCell(rowIndex, index)
                      }}
                    />
                  ))
                }
              </div>
            ))
          }
        </div>
        <div className={styles.operationArea}>
          <span className={styles.label}>Auto</span>
          <Switch
            checked={Boolean(automata)}
            onChange={(e, v) => {
              if (v) {
                setAutomata(setInterval(evoluteWorld, step))
              } else {
                if (automata) {
                  clearInterval(automata)
                  setAutomata(null)
                }
              }
            }}
          />
          <span className={styles.label}>Speed</span>
          <Slider
            getAriaValueText={(v) => Speeds[v]}
            step={null}
            valueLabelDisplay="off"
            marks={SpeedMarks}
            value={step}
            min={SpeedMarks[0].value}
            max={SpeedMarks[SpeedMarks.length - 1].value}
            onChange={(e, v) => {
              if (!Array.isArray(v)) {
                setStep(v)
                if (automata) {
                  clearInterval(automata)
                  setAutomata(setInterval(evoluteWorld, v))
                }
              } else {
                throw new Error("step is NOT a number")
              }
            }}
          />
          <Button
            size="large"
            variant="contained"
            onClick={evoluteWorld}
            disabled={Boolean(automata)}
            className={styles.operationButton}
          >
            EVOLUTE
          </Button>
          <Button
            size="large"
            onClick={clearWorld}
            disabled={Boolean(automata)}
            className={styles.operationButton}
            color="error"
          >
            CLEAR
          </Button>
        </div>
      </div>
    </div>
  )
}

export default LifeGame
