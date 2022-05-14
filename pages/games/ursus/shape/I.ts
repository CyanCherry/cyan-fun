import { Block, Blocks, ERR_ICONS_LEN, Shape } from "./Shape"
import { WIDTH } from "../configure"

export class I extends Shape {
  readonly direction: number = 0

  constructor(props: { icons: Block["icon"][] } | { blocks: Block[], direction: number }) {
    if ("icons" in props) {
      if (props.icons.length !== 4) {
        throw ERR_ICONS_LEN
      }
      const center = ~~(WIDTH / 2)
      super([
        { x: center - 1, y: -1, icon: props.icons[0] },
        { x: center, y: -1, icon: props.icons[1] },
        { x: center + 1, y: -1, icon: props.icons[2] },
        { x: center + 2, y: -1, icon: props.icons[3] },
      ])
    } else {
      super(props.blocks)
      this.direction = props.direction
    }
  }

  left(): I {
    return new I({
      blocks: Blocks.left(this.blocks),
      direction: this.direction,
    })
  }

  right(): I {
    return new I({
      blocks: Blocks.right(this.blocks),
      direction: this.direction,
    })
  }

  down(): I {
    return new I({
      blocks: Blocks.down(this.blocks),
      direction: this.direction,
    })
  }

  up(): I {
    return new I({
      blocks: Blocks.up(this.blocks),
      direction: this.direction,
    })
  }

  spin(): I {
    const pivot = this.direction === 0 ? 1 : 2
    const x = this.blocks[pivot].x
    const y = this.blocks[pivot].y
    const blocks = this.direction === 0 ? [
      { x, y: y - 1, icon: this.blocks[0].icon },
      { x, y, icon: this.blocks[1].icon },
      { x, y: y + 1, icon: this.blocks[2].icon },
      { x, y: y + 2, icon: this.blocks[3].icon },
    ] : [
      { x: x - 1, y, icon: this.blocks[3].icon },
      { x, y, icon: this.blocks[2].icon },
      { x: x + 1, y, icon: this.blocks[1].icon },
      { x: x + 2, y, icon: this.blocks[0].icon },
    ]
    return new I({
      blocks,
      direction: (this.direction + 1) % 2,
    })
  }
}
