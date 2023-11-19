import GithubAuth from '~/integrations/github/auth';
import GithubClient from '~/integrations/github';
import { For, createEffect, createSignal } from 'solid-js';
import { Discussion } from '~/integrations/graphql';

export default () => {
  return (
    <GithubAuth>
      {token => {
        const client = GithubClient("abetaev", "test", token);
        const [getDiscussions, setDiscussions] = createSignal<Discussion[]>();
        client.discussions().then(setDiscussions)
        return (
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
        )
      }}
    </GithubAuth>
  )
}