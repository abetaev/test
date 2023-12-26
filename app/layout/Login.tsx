import Article from "~/components/core/Article";
import Button from "~/components/core/Button";
import Dialog from "~/components/core/Dialog";
import HGroup from "~/components/core/HGroup";
import Input from "~/components/core/Input";
import VGroup from "~/components/core/VGroup";

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
          <Button onClick={alert}>info</Button>
        </HGroup>
      </VGroup>
    </Article>
  </Dialog>
)