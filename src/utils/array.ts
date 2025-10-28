export interface MatrixArgs<T> {
  height: number
  width: number
  value: T
}

export function matrix<T>({ height, width, value }: MatrixArgs<T>) {
  const grids = new Array(height)
  for (let i = 0; i < height; i++) {
    grids[i] = new Array(width).fill(value)
  }
  return grids
}

export function random<T>(array: T[]) {
  return array[~~(array.length * Math.random())]
}
