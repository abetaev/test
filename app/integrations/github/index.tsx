import client, { SDK } from './client'
import Auth from './Auth'
import type {JSXElement} from 'solid-js'


type Props = {children: (client: SDK) => JSXElement}
export default (props: Props) => (
  <Auth>
    {token => props.children(client({"repo": "test", "user":"abetaev", token}))}
  </Auth>
)