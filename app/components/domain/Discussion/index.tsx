import { Discussion } from "~/integrations/github/graphql/sdk";
import './index.css'
import Header from "./Header";
import { Show } from "solid-js";
import Main from "./Main";
import Article from "~/components/core/Article";

type Props = { data?: Discussion | null }
export default (props: Props) => (
  <Article>
    <Header subtitle={
      <>
        created: {props.data?.createdAt}
        <Show when={props.data?.lastEditedAt}>
          , edited: {props.data?.lastEditedAt}
        </Show>
      </>
    }>
      {props.data?.title}
    </Header>
    <Main>{props.data?.body}</Main>
  </Article>
)