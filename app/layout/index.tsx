import { For } from 'solid-js';
import Github from '~/integrations/github';
import { Async } from '~/utils/Async';

export default () => {
  return (
    <Github>
      {client => <>
        <Async>
          {async () => {
            const discussionCategories = await client.getDiscussions({ repo: "test", user: "abetaev" })
            return () => (
              <For each={discussionCategories.repository?.discussions?.edges}>
                {discussion => <>{discussion?.node?.title}</>}
              </For>
            )
          }}
        </Async>
      </>}
    </Github>
  )
}
