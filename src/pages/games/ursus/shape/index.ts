import { I } from "./I"
import { L } from "./L"
import { MirroredL } from "./MirroredL"
import { S } from "./S"
import { Square } from "./Square"
import { T } from "./T"
import { Z } from "./Z"
import { Shape } from "./Shape"

// 5rr5y of grouped shapes
export const shapeCollections: Shape[][] = [
  [
    new I({
      icons: ["#500", "#500", "#500", "#500"],
    }),
    new I({
      icons: ["#A00", "#A00", "#A00", "#A00"],
    }),
    new I({
      icons: ["#C00", "#C00", "#C00", "#C00"],
    }),
  ],
  [
    new L({
      icons: ["#050", "#050", "#050", "#050"],
    }),
    new L({
      icons: ["#0A0", "#0A0", "#0A0", "#0A0"],
    }),
    new L({
      icons: ["#0C0", "#0C0", "#0C0", "#0C0"],
    }),
  ],
  [
    new MirroredL({
      icons: ["#005", "#005", "#005", "#005"],
    }),
    new MirroredL({
      icons: ["#00A", "#00A", "#00A", "#00A"],
    }),
    new MirroredL({
      icons: ["#00C", "#00C", "#00C", "#00C"],
    }),
  ],
  [
    new S({
      icons: ["#505", "#505", "#505", "#505"],
    }),
    new S({
      icons: ["#A0A", "#A0A", "#A0A", "#A0A"],
    }),
    new S({
      icons: ["#C0C", "#C0C", "#C0C", "#C0C"],
    }),
  ],
  [
    new Square({
      icons: ["#550", "#550", "#550", "#550"],
    }),
    new Square({
      icons: ["#AA0", "#AA0", "#AA0", "#AA0"],
    }),
    new Square({
      icons: ["#CC0", "#CC0", "#CC0", "#CC0"],
    }),
  ],
  [
    new T({
      icons: ["#055", "#055", "#055", "#055"],
    }),
    new T({
      icons: ["#0AA", "#0AA", "#0AA", "#0AA"],
    }),
    new T({
      icons: ["#0CC", "#0CC", "#0CC", "#0CC"],
    }),
  ],
  [
    new Z({
      icons: ["#555", "#555", "#555", "#555"],
    }),
    new Z({
      icons: ["#666", "#666", "#666", "#666"],
    }),
    new Z({
      icons: ["#777", "#777", "#777", "#777"],
    }),
  ],
]
