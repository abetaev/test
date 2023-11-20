import { GraphQLClient, request } from 'graphql-request'
import { Discussion, DiscussionCategory, GetDiscussionCategoriesDocument, GetDiscussionsDocument, NewDiscussionDocument } from '../graphql'
import _omit from 'lodash/omit'

type Repository = {
  discussions(): Promise<Discussion[]>
  discussionCategories(): Promise<(DiscussionCategory)[]>
  newDiscussion(repositoryId: string, categoryId: string, title: string, body: string): Promise<Discussion>
}

const url = "https://api.github.com/graphql"

type Props = { user: string, repo: string, token: string }
export default (props: Props): Repository => {
  const client = new GraphQLClient(url, {
    headers: {
      "Authorization": props.token
    }
  })
  const variables = _omit(props, "token")
  return {
    discussions: () => client.request({
      document: GetDiscussionsDocument,
      variables,
    }).then(
      response => response
        .repository
        ?.discussions
        ?.edges
        ?.map(edge => edge?.node as Discussion) ?? []
    ),
    discussionCategories: () => client.request({
      document: GetDiscussionCategoriesDocument,
      variables,
    }).then(
      response => response
        ?.repository
        ?.discussionCategories
        ?.nodes
        ?.map(node => node as DiscussionCategory) ?? []
    ),
    newDiscussion: (repositoryId, categoryId, title, body) => client.request({
      document: NewDiscussionDocument,
      variables: {
        repositoryId,
        categoryId,
        title,
        body
      }
    }).then(
      response => response?.createDiscussion?.discussion as Discussion
    )
  }
}