import { JSX, JSXElement } from "solid-js"
import omit from 'lodash/omit'
import './Input.css'

type Props = { children?: JSXElement } & JSX.InputHTMLAttributes<HTMLInputElement>
export default (props: Props) => (
  <input {...omit(props, "children")}>{props.children}</input>
)