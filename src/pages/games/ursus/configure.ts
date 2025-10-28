export const HEIGHT = 12
export const WIDTH = 10

// used by setInterval or setTimeout
export const ANIMATION_DURATION = 1000
export const STEP = 1000

// key of KeyboardEvent
export const SPIN_KEYS = ["w", "ArrowUp"]
export const LEFT_KEYS = ["a", "ArrowLeft"]
export const RIGHT_KEYS = ["d", "ArrowRight"]
export const QUICK_DOWN_KEYS = ["s", "ArrowDown", " "]
export const ALL_KEYS = [
  ...SPIN_KEYS,
  ...LEFT_KEYS,
  ...RIGHT_KEYS,
  ...QUICK_DOWN_KEYS,
]
