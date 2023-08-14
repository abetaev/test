import { For, createEffect, createSignal, splitProps } from "solid-js";
import type { DiscussionComment } from "~/integrations/graphql/graphql";
import Github from "./Github";

type Props = {
  location?: string
  clientId: string
  authURL: string
  repo: string
  user: string
  id: string
}
export default (props: Props) => {
  const input = <textarea style={{ resize: "vertical" }} /> as HTMLTextAreaElement
  const [localProps, githubProps] = splitProps(props, ["id"])
  return (
    <Github
      fallback={(LoginButton) => (<LoginButton>access comments</LoginButton>)}
      {...githubProps}
    >
      {client => {
        const [getDiscussionComments, setDiscussionComments] = createSignal<DiscussionComment[]>([])
        createEffect(async () => {
          setDiscussionComments(await client.getDiscussionComments(localProps.id, null))
        })
        return (
          <>
            <For each={getDiscussionComments()}>
              {comment => <Comment {...comment} />}
            </For>
            <div>
              {input}
              <button onClick={async () => {
                await client.addDiscussionComment(localProps.id, input.value)
                setDiscussionComments(await client.getDiscussionComments(localProps.id, null))
              }} >comment</button>
            </div>
          </>
        )
      }}
    </Github>
  )
}

type CommentProps = DiscussionComment
const Comment = (props: CommentProps) => (
  <article>
    {props.author?.name ?? props.author?.login}: {props.body}
  </article>
)