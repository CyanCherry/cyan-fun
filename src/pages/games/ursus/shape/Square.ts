import { Block, Blocks, ERR_ICONS_LEN, Shape } from "./Shape"
import { WIDTH } from "../configure"

export class Square extends Shape {
  constructor(props: { icons: Block["icon"][] } | { blocks: Block[] }) {
    if ("icons" in props) {
      const icons = props.icons
      if (icons.length !== 4) {
        throw ERR_ICONS_LEN
      }
      const center = ~~(WIDTH / 2)
      super([
        { x: center + 1, y: -2, icon: icons[0] },
        { x: center + 1, y: -1, icon: icons[1] },
        { x: center, y: -1, icon: icons[2] },
        { x: center, y: -2, icon: icons[3] },
      ])
    } else {
      super(props.blocks)
    }
  }

  left(): Square {
    return new Square({
      blocks: Blocks.left(this.blocks),
    })
  }

  right(): Square {
    return new Square({
      blocks: Blocks.right(this.blocks),
    })
  }

  down(): Square {
    return new Square({
      blocks: Blocks.down(this.blocks),
    })
  }

  up(): Square {
    return new Square({
      blocks: Blocks.up(this.blocks),
    })
  }

  spin(): Square {
    return new Square({
      blocks: [
        { ...this.blocks[0], icon: this.blocks[3].icon },
        { ...this.blocks[1], icon: this.blocks[0].icon },
        { ...this.blocks[2], icon: this.blocks[1].icon },
        { ...this.blocks[3], icon: this.blocks[2].icon },
      ],
    })
  }
}
