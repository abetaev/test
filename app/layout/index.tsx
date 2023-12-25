import ArticleList from '~/components/ArticleList';
import Github from '~/integrations/github';
import { Async } from '~/utils/Async';

export default () => {
  return (
    <Github>
      {client => <>
        <Async>
          {async () => {
            const discussions = await client.getDiscussions({ repo: "test", user: "abetaev" })
            return () => <ArticleList discussions={discussions}/>
          }}
        </Async>
      </>}
    </Github>
  )
}
