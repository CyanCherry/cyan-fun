import { WIDTH } from "../configure"
import { Block, Blocks, ERR_ICONS_LEN, Shape } from "./Shape"

export class L extends Shape {
  readonly direction: number = 0

  constructor(props: { icons: Block["icon"][] } | { blocks: Block[], direction: number }) {
    if ("icons" in props) {
      const icons = props.icons
      if (icons.length !== 4) {
        throw ERR_ICONS_LEN
      }
      const center = ~~(WIDTH / 2)
      super([
        { x: center, y: -3, icon: icons[0] },
        { x: center, y: -2, icon: icons[1] },
        { x: center, y: -1, icon: icons[2] },
        { x: center + 1, y: -1, icon: icons[3] },
      ])
    } else {
      super(props.blocks)
      this.direction = props.direction
    }
  }

  left(): L {
    return new L({
      blocks: Blocks.left(this.blocks),
      direction: this.direction,
    })
  }

  right(): L {
    return new L({
      blocks: Blocks.right(this.blocks),
      direction: this.direction,
    })
  }

  down(): L {
    return new L({
      blocks: Blocks.down(this.blocks),
      direction: this.direction,
    })
  }

  up(): L {
    return new L({
      blocks: Blocks.up(this.blocks),
      direction: this.direction,
    })
  }

  spin(): L {
    const x = this.blocks[1].x
    const y = this.blocks[1].y
    let blocks: Block[]
    if (this.direction === 0) {
      blocks = [
        { x: x + 2, y, icon: this.blocks[0].icon },
        { x: x + 1, y, icon: this.blocks[1].icon },
        { x, y, icon: this.blocks[2].icon },
        { x, y: y + 1, icon: this.blocks[3].icon },
      ]
    } else if (this.direction === 1) {
      blocks = [
        { x, y: y + 2, icon: this.blocks[0].icon },
        { x, y: y + 1, icon: this.blocks[1].icon },
        { x, y, icon: this.blocks[2].icon },
        { x: x - 1, y, icon: this.blocks[3].icon },
      ]
    } else if (this.direction === 2) {
      blocks = [
        { x: x - 2, y, icon: this.blocks[0].icon },
        { x: x - 1, y, icon: this.blocks[1].icon },
        { x, y, icon: this.blocks[2].icon },
        { x, y: y - 1, icon: this.blocks[3].icon },
      ]
    } else {
      blocks = [
        { x, y: y - 2, icon: this.blocks[0].icon },
        { x, y: y - 1, icon: this.blocks[1].icon },
        { x, y, icon: this.blocks[2].icon },
        { x: x + 1, y, icon: this.blocks[3].icon },
      ]
    }
    return new L({ blocks, direction: (this.direction + 1) % 4 })
  }
}
