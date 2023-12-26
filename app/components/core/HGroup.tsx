import { JSX, JSXElement } from "solid-js"
import "./HGroup.css"

type Props = { children: JSXElement } & JSX.HTMLAttributes<HTMLDivElement>
export default (props: Props) => (
  <div class="hgroup">
    {props.children}
  </div>
)