import Article from "~/components/core/Article";
import Button from "~/components/core/Button";
import Dialog from "~/components/core/Dialog";
import HGroup from "~/components/core/HGroup";
import Input from "~/components/core/Input";
import VGroup from "~/components/core/VGroup";

import runtime from '~/services'

type Props = { login: () => unknown }
export default (props: Props) => (
  <Dialog>
    <Article>
      <VGroup>
        <HGroup>
          <Input /><Input /><Button />
        </HGroup>
        <HGroup>
          <Button onClick={props.login}>login</Button>
          <Button onClick={async () => {
            console.log(1)
            await runtime.account.create("user", "password")
            console.log(2)
          }}>info</Button>
        </HGroup>
      </VGroup>
    </Article>
  </Dialog>
)