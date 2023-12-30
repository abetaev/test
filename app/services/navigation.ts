import { Component, JSXElement, createSignal } from "solid-js"

type View = {
  component: Component
  resolve: () => void
}
const [getStack, setStack] = createSignal<View[]>([])
const service = {
  show(component: Component) {
    const stack = getStack()
    return new Promise<void>(resolve => setStack([{ component, resolve }, ...stack]))
  },
  back() {
    const [head, ...rest] = getStack()
    head.resolve()
    setStack(rest)
  },
  view: (): JSXElement => getStack()[0].component as unknown as JSXElement
}

export default service
type Service = typeof service
export type { Service as NavigationService }