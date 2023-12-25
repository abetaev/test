import { Component, JSXElement, lazy } from "solid-js"

function async(promise: () => Promise<Component<any>>): Component<any> {
  return lazy(() => promise().then(x => ({ default: x })))
}

type AsyncProps = { children: () => Promise<Component<any>> }
export const Async = (props: AsyncProps) => async(() => props.children()) as unknown as JSXElement