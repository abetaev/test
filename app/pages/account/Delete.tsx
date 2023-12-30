import Article from "~/components/core/Article";
import Button from "~/components/core/Button";
import Dialog from "~/components/core/Dialog";
import HGroup from "~/components/core/HGroup";
import Header from "~/components/core/Header";
import Input from "~/components/core/Input";
import runtime from "~/services";

type Props = { username: string }
export default (props: Props) => {
  const password = <Input type="password" placeholder="password" /> as HTMLInputElement
  return (
    <Dialog>
      <Article>
        <Header>{props.username}</Header>
        <HGroup>
          <Button onClick={() => runtime.navigation.back()}>back</Button>
          {password}
          <Button
            class="warning"
            onClick={async () => {
              try {
                await runtime.account.delete(props.username, password.value)
                runtime.navigation.back()
              } catch (error) {
                alert(error)
              }
            }}>delete</Button>
        </HGroup>
      </Article>
    </Dialog>
  )
}