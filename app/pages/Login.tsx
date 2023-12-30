import Article from "~/components/core/Article";
import Button from "~/components/core/Button";
import Dialog from "~/components/core/Dialog";
import HGroup from "~/components/core/HGroup";
import Header from "~/components/core/Header";
import Input from "~/components/core/Input";
import Home from "~/components/home";
import Singular from "~/layouts/Singular";
import runtime from "~/services";

type Props = { username: string }
export default (props: Props) => {
  async function login() {
    try {
      const session = await runtime.session.login(props.username, password.value)
      await runtime.navigation.show(() => <Home session={session} />)
      runtime.navigation.back();
    } catch (cause) {
      throw new Error("unable to log in", { cause })
    }
  }
  const password = <Input
    type="password"
    placeholder="password"
    onKeyDown={({key}) => key === "Enter" && login()}
  /> as HTMLInputElement
  return (
    <Singular>
      <Article>
        <Header>{props.username}</Header>
        <HGroup>
          <Button onClick={() => runtime.navigation.back()}>back</Button>
          {password}
          <Button onClick={login}>login</Button>
        </HGroup>
      </Article>
    </Singular>
  )
}