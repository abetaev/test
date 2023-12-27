import { JSX, JSXElement, splitProps } from "solid-js"

import './Dialog.css'

type Props = { children?: JSXElement } & Omit<JSX.DialogHtmlAttributes<HTMLDialogElement>, "children" | "open">
export default (props: Props) => (
  <dialog open {...props}>
    {props.children}
  </dialog>
)