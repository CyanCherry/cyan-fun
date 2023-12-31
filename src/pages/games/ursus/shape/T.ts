import { WIDTH } from "../configure"
import { Block, Blocks, ERR_ICONS_LEN, Shape } from "./Shape"

export class T extends Shape {
  readonly direction: number = 0

  constructor(props: { icons: Block["icon"][] } | { blocks: Block[], direction: number }) {
    if ("icons" in props) {
      const icons = props.icons
      if (icons.length !== 4) {
        throw ERR_ICONS_LEN
      }
      const center = ~~(WIDTH / 2)
      super([
        { x: center, y: -1, icon: icons[0] },
        { x: center - 1, y: -1, icon: icons[1] },
        { x: center, y: -2, icon: icons[2] },
        { x: center + 1, y: -1, icon: icons[3] },
      ])
    } else {
      super(props.blocks)
      this.direction = props.direction
    }
  }

  left(): T {
    return new T({
      blocks: Blocks.left(this.blocks),
      direction: this.direction,
    })
  }

  right(): T {
    return new T({
      blocks: Blocks.right(this.blocks),
      direction: this.direction,
    })
  }

  down(): T {
    return new T({
      blocks: Blocks.down(this.blocks),
      direction: this.direction,
    })
  }

  up(): T {
    return new T({
      blocks: Blocks.up(this.blocks),
      direction: this.direction,
    })
  }

  spin(): T {
    const x = this.blocks[0].x
    const y = this.blocks[0].y
    let blocks: Block[]
    if (this.direction === 0) {
      blocks = [
        { x, y, icon: this.blocks[0].icon },
        { x, y: y - 1, icon: this.blocks[1].icon },
        { x: x + 1, y, icon: this.blocks[2].icon },
        { x, y: y + 1, icon: this.blocks[3].icon },
      ]
    } else if (this.direction === 1) {
      blocks = [
        { x, y, icon: this.blocks[0].icon },
        { x: x + 1, y, icon: this.blocks[1].icon },
        { x, y: y + 1, icon: this.blocks[2].icon },
        { x: x - 1, y, icon: this.blocks[3].icon },
      ]
    } else if (this.direction === 2) {
      blocks = [
        { x, y, icon: this.blocks[0].icon },
        { x, y: y + 1, icon: this.blocks[1].icon },
        { x: x - 1, y, icon: this.blocks[2].icon },
        { x, y: y - 1, icon: this.blocks[3].icon },
      ]
    } else {
      blocks = [
        { x, y, icon: this.blocks[0].icon },
        { x: x - 1, y, icon: this.blocks[1].icon },
        { x, y: y - 1, icon: this.blocks[2].icon },
        { x: x + 1, y, icon: this.blocks[3].icon },
      ]
    }
    return new T({ blocks, direction: (this.direction + 1) % 4 })
  }
}
