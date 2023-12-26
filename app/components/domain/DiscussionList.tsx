import { For } from "solid-js";
import Article from "./Discussion";
import { GetDiscussionsQuery } from "~/integrations/github/graphql/sdk";

type Props = { discussions?: GetDiscussionsQuery | null }
export default (props: Props) => (
  <For each={props.discussions?.repository?.discussions?.edges}>
    {edge => <Article data={edge?.node} />}
  </For>
)