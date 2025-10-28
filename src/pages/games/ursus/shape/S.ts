import { WIDTH } from "../configure"
import { type Block, Blocks, ERR_ICONS_LEN, Shape } from "./Shape"

export class S extends Shape {
  readonly direction: number = 0

  constructor(
    props: { icons: Block["icon"][] } | { blocks: Block[]; direction: number },
  ) {
    let blocks: Block[]
    if ("icons" in props) {
      const icons = props.icons
      if (icons.length !== 4) {
        throw ERR_ICONS_LEN
      }
      const center = ~~(WIDTH / 2)
      blocks = [
        { x: center + 1, y: -2, icon: icons[0] },
        { x: center, y: -2, icon: icons[1] },
        { x: center, y: -1, icon: icons[2] },
        { x: center - 1, y: -1, icon: icons[3] },
      ]
    } else {
      blocks = props.blocks
    }
    super(blocks)
    if (!("icons" in props)) {
      this.direction = props.direction
    }
  }

  left(): S {
    return new S({
      blocks: Blocks.left(this.blocks),
      direction: this.direction,
    })
  }

  right(): S {
    return new S({
      blocks: Blocks.right(this.blocks),
      direction: this.direction,
    })
  }

  down(): S {
    return new S({
      blocks: Blocks.down(this.blocks),
      direction: this.direction,
    })
  }

  up(): S {
    return new S({
      blocks: Blocks.up(this.blocks),
      direction: this.direction,
    })
  }

  spin(): S {
    const pivot = this.direction === 0 ? 1 : 2
    const x = this.blocks[pivot].x
    const y = this.blocks[pivot].y
    const blocks: Block[] =
      this.direction === 0
        ? [
            { x, y: y + 1, icon: this.blocks[0].icon },
            { x, y, icon: this.blocks[1].icon },
            { x: x - 1, y, icon: this.blocks[2].icon },
            { x: x - 1, y: y - 1, icon: this.blocks[3].icon },
          ]
        : [
            { x: x + 1, y, icon: this.blocks[3].icon },
            { x, y, icon: this.blocks[2].icon },
            { x, y: y + 1, icon: this.blocks[1].icon },
            { x: x - 1, y: y + 1, icon: this.blocks[0].icon },
          ]
    return new S({ blocks, direction: (this.direction + 1) % 2 })
  }
}
