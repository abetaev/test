import { JSX, JSXElement } from "solid-js"

import "./Article.css"

type Props = { children?: JSXElement } & JSX.HTMLAttributes<HTMLDivElement>
export default (props: Props) => (
  <article>
    {props.children}
  </article>
)