import { For, createEffect, createSignal } from 'solid-js';
import github from '~/integrations/github/index'
import { Discussion } from '~/integrations/graphql';

export default () => {
  const [getDiscussions, setDiscussions] = createSignal<Discussion[]>();
  createEffect(async () => setDiscussions(await github("abetaev", "test").discussions()))
  return (
    <For each={getDiscussions()}>
      {discussion => (
        <article>
          <header>
            <hgroup>
              <h1>{discussion.title}</h1>
              <h2>{discussion.createdAt}</h2>
            </hgroup>
          </header>
          <main>
            {discussion.body}
          </main>
        </article>
      )}
    </For>
  )
}