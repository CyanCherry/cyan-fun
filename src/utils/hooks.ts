import {
  type DependencyList,
  type EffectCallback,
  useEffect,
  useRef,
} from "react"

export function useMountedEffect(
  effect: EffectCallback,
  deps?: DependencyList,
) {
  const mounted = useRef(false)
  const strict = useRef<undefined | string>(process.env.REACT_STRICT_MODE)
  useEffect(() => {
    if (strict.current) {
      strict.current = undefined
      return
    }
    if (!mounted.current) {
      mounted.current = true
      return
    }
    return effect()
  }, deps)
}
