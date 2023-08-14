import { Client, cacheExchange, fetchExchange } from '@urql/core';
import {
  AddDiscussionCommentDocument as AddDiscussionComment,
  GetDiscussionsDocument as GetDiscussions,
  GetDiscussionCommentsDocument as GetDiscussionComments,
  GetIdsOfRepositoryAndDiscussionCategoryDocument as GetIdsOfRepositoryAndDiscussionCategory,
  CreateDiscussionDocument as CreateDiscussion,
  Discussion,
  Comment,
  DiscussionComment,
  GetDiscussionsQueryVariables
} from '~/integrations/graphql/graphql';



type Props = {
  user: string
  repo: string
  auth: string
}
export interface GithubClient {
  getDiscussionId(title: string): Promise<string>
  getOrCreateDiscussionId(title: string): Promise<string>
  addDiscussionComment(discussionId: string, body: string): Promise<string>
  getDiscussionComments(discussionId: string, iterator: string | null): Promise<DiscussionComment[]>
}
export default (props: Props): GithubClient => {
  const client = new Client({
    url: 'https://api.github.com/graphql',
    exchanges: [cacheExchange, fetchExchange],
    fetchOptions: () => ({
      headers: {
        "Authorization": props.auth
      }
    })
  });

  async function getDiscussionIndex(): Promise<Record<string, string>> {
    const variables: GetDiscussionsQueryVariables = { ...props, iterator: null }
    const output: Record<string, string> = {}
    do {
      const result = await client.query(GetDiscussions, variables)
      result.data?.repository?.discussions.edges?.map((edge) => (edge?.node as Discussion))
        .forEach(discussion => output[discussion.title] = discussion.id)
      if (result?.data?.repository?.discussions?.pageInfo.hasNextPage)
        variables.iterator = result?.data?.repository?.discussions?.pageInfo.endCursor ?? null
      else
        variables.iterator = null
    } while (variables.iterator)
    return output
  }

  async function getDiscussionIdOr(title: string, or: (title: string) => string | undefined | Promise<string> | Promise<undefined> | Promise<string | undefined>): Promise<string> {
    const discussionId = (await getDiscussionIndex())[title]
    if (discussionId) return discussionId
    else {
      const alternativeDiscussionId = or(title)
      if (!alternativeDiscussionId) throw `cannot get discussion for '${title}'`
      else return alternativeDiscussionId as string
    }
  }

  async function getIdsOfRepositoryAndDiscussionCategory() {
    const result = await client.query(GetIdsOfRepositoryAndDiscussionCategory, props)
    const repositoryId = result?.data?.repository?.id
    if (!repositoryId) throw `repository not found for '${props.repo}/${props.user}'`
    const categories = result?.data?.repository?.discussionCategories?.nodes ?? []
    const categoryId = categories[0]?.id
    if (!categoryId) throw `discussion category not found for '${props.repo}/${props.user}'`
    return { repositoryId, categoryId }
  }

  async function createDiscussion(title: string): Promise<string> {
    const ids = await getIdsOfRepositoryAndDiscussionCategory()
    const result = await client.mutation(CreateDiscussion, { title, ...props, ...ids })
    const id = result.data?.createDiscussion?.discussion?.id
    if (!id) throw `cannot create discussion for '${title}'`
    return id
  }

  return {
    getDiscussionId: (title: string) => getDiscussionIdOr(title, () => undefined),
    getOrCreateDiscussionId: (title: string) => getDiscussionIdOr(title, () => createDiscussion(title)),
    async addDiscussionComment(discussionId: string, body: string): Promise<string> {
      const response = await client.mutation(AddDiscussionComment, { discussionId, body })
      const id = response.data?.addDiscussionComment?.comment?.id
      if (!id || response.error) throw `unable to comment to ${discussionId}: ${response.error}`
      return id
    },
    async getDiscussionComments(discussionId: string, iterator: string | null = null): Promise<DiscussionComment[]> {
      const result = await client.query(GetDiscussionComments, {
        batchSize: 10,
        discussionId,
        iterator
      })
      const node = result.data?.node
      if (!node) throw `discussion ${discussionId} cannot be viewed`
      const discussion = node as Discussion
      return discussion.comments.edges?.map(edge => (edge?.node as Comment))
        .map(({ id, author, body }) => ({ id, author, body })) as DiscussionComment[]
    }
  }

}