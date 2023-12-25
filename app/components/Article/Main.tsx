import { JSXElement } from "solid-js";

import "./Main.css"

type Props = { children: JSXElement }
export default (props: Props) => (
  <main>{props.children}</main>
)