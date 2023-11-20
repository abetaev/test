import GithubAuth from '~/integrations/github/auth';
import GithubClient from '~/integrations/github';
import { For, createEffect, createSignal } from 'solid-js';
import { Discussion, DiscussionCategory } from '~/integrations/graphql';

export default () => {
  return (
    <GithubAuth>
      {token => {
        const client = GithubClient({ user: "abetaev", repo: "test", token });
        const [getDiscussions, setDiscussions] = createSignal<Discussion[]>();
        const [getDiscussionCategories, setDiscussionCategories] = createSignal<DiscussionCategory[]>()
        client.discussions().then(setDiscussions)
        client.discussionCategories().then(setDiscussionCategories)
        return (
          <>
            <For each={getDiscussions()}>
              {discussion => (
                <article>
                  <header>
                    <h1>{discussion.title}</h1>
                  </header>
                  <main>{discussion.body}</main>
                </article>
              )}
            </For>
            <hr />
            <ul>
              <For each={getDiscussionCategories()}>
                {category => {
                  var input = <input/> as HTMLInputElement
                  var textarea = <textarea/> as HTMLTextAreaElement
                  return (
                    <li>
                      {input}
                      {textarea}
                      <button onClick={() => {
                        client.newDiscussion(category.repository.id, category.id, input.value, textarea.value)
                      }}>{category.name}</button>
                    </li>
                  )
                }
                }
              </For>
            </ul>
          </>
        )
      }}
    </GithubAuth>
  )
}