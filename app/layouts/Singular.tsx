import { JSXElement } from 'solid-js'
import './Singular.css'

type Props = { children: JSXElement }
export default (props: Props) => (
  <div class="singular layout">
    {props.children}
  </div>
)