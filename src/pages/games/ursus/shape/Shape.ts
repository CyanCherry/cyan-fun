import type { Panel } from "../index"
import { HEIGHT, WIDTH } from "../configure"

export const ERR_ICONS_LEN = new Error("invalid icons LENGTH")
export const ERR_OUT_OF_PANEL = new Error("OUT of game panel")
export const ERR_CELL_NOT_EMPTY = new Error(
  "trying to print to a NOT empty cell",
)

// immutable
export interface Block {
  readonly icon: string
  readonly x: number
  readonly y: number
}

export const Blocks = {
  left(blocks: Block[]): Block[] {
    return blocks.map((block) => ({
      ...block,
      x: block.x - 1,
    }))
  },

  right(blocks: Block[]): Block[] {
    return blocks.map((block) => ({
      ...block,
      x: block.x + 1,
    }))
  },

  down(blocks: Block[]): Block[] {
    return blocks.map((block) => ({
      ...block,
      y: block.y + 1,
    }))
  },

  up(blocks: Block[]): Block[] {
    return blocks.map((block) => ({
      ...block,
      y: block.y - 1,
    }))
  },
}

// immutable
export abstract class Shape {
  // assure the blocks are in the special shape manually
  blocks: Block[]

  protected constructor(blocks: Block[]) {
    this.blocks = [...blocks]
  }

  abstract spin(): Shape

  abstract left(): Shape

  abstract right(): Shape

  abstract down(): Shape

  abstract up(): Shape

  print(panel: readonly (string | null)[][]): Panel {
    const newPanel = [...panel]
    this.blocks.forEach((block) => {
      if (block.y < 0) {
        return
      }
      if (block.x < WIDTH && block.y < HEIGHT) {
        if (newPanel[block.y][block.x] !== null) {
          console.log({ panel, block })
          throw ERR_CELL_NOT_EMPTY
        }
        newPanel[block.y] = [...newPanel[block.y]]
        newPanel[block.y][block.x] = block.icon
      } else {
        throw ERR_OUT_OF_PANEL
      }
    })
    return newPanel
  }
}
