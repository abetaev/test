import { JSXElement } from "solid-js"

import './Dialog.css'

type Props = { children: JSXElement }
export default (props: Props) => (
  <dialog open>
    {props.children}
  </dialog>
)