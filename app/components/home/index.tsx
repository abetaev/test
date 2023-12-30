import Article from "~/components/core/Article"
import HGroup from "~/components/core/HGroup"
import Button from "../core/Button"
import runtime from "~/services"

type Props = { session: string }
export default (props: Props) => {
  return (
    <Article>
      <HGroup>
        <Button onClick={() => {
          runtime.session.close(props.session);
          runtime.navigation.back();
        }}>logout</Button>
      </HGroup>
    </Article>
  )
}