import { Async } from "~/utils/Async"
import DiscussionList from "~/components/domain/DiscussionList"
import { SDK } from "~/integrations/github/client"
import env from "~/integrations/env"

type Props = { client: SDK }
export default (props: Props) => (
  <Async>
    {async () => {
      const discussions = await props.client.getDiscussions({ repo: env("REPO"), user: env("USER") })
      return () => <DiscussionList discussions={discussions} />
    }}
  </Async>
)