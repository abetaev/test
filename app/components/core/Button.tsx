import { JSX, JSXElement, splitProps } from "solid-js"

import './Button.css'

type Props = { children?: JSXElement } & JSX.ButtonHTMLAttributes<HTMLButtonElement>
export default (props: Props) => (
  <button {...props}>{props.children}</button>
)