import { JSX, JSXElement } from "solid-js"
import "./VGroup.css"

type Props = { children: JSXElement } & JSX.HTMLAttributes<HTMLDivElement>
export default (props: Props) => (
  <div class="vgroup">
    {props.children}
  </div>
)