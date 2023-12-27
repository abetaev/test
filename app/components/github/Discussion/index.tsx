import { Show } from "solid-js";
import Article from "~/components/core/Article";
import Header from "~/components/core/Header";
import { Discussion } from "~/integrations/github/graphql/sdk";
import Main from "./Main";
import './index.css';

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