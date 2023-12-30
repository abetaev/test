import { For, createResource } from "solid-js";
import Article from "~/components/core/Article";
import Button from "~/components/core/Button";
import HGroup from "~/components/core/HGroup";
import Input from "~/components/core/Input";
import VGroup from "~/components/core/VGroup";

import runtime from '~/services'
import Login from "../Login";
import Delete from "./Delete";
import Singular from "~/layouts/Singular";

const [list, { refetch }] = createResource(
  runtime.account.list,
)

export default () => (
  <Singular>
    <Article>
      <VGroup>
        <For each={list.latest}>
          {username => (
            <HGroup>
              <AccountControls username={username} />
            </HGroup>
          )}
        </For>
        <HGroup>
          <CreateAccount />
        </HGroup>
      </VGroup>
    </Article>
  </Singular>
)

type AccountControlsProps = { username: string }
const AccountControls = (props: AccountControlsProps) => (
  <>
    <Button onClick={() => runtime.navigation.show(() => <Login {...props} />)}>{props.username}</Button>
    <Button
      style={{ "flex-grow": "0" }}
      class="warning"
      onClick={() => runtime.navigation.show(() => <Delete username={props.username} />)}
    >delete</Button>
  </>
)


const CreateAccount = () => {
  const username = <Input placeholder="username" /> as HTMLInputElement
  const password = <Input type="password" placeholder="password" /> as HTMLInputElement
  return (
    <>
      {username}
      {password}
      <Button onClick={async () => {
        await runtime.account.create(username.value, password.value)
        refetch()
      }}>create</Button>
    </>
  )
}