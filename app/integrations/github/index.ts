import { request } from 'graphql-request'
import { Discussion, GetDiscussionsDocument } from '~/integrations/graphql'

type Repository = {
  discussions(): Promise<Discussion[]>
}

const url = "https://api.github.com/graphql"

export default (user: string, repo: string): Repository => {

  return {
    discussions: async () => {
      const response = await request({
        url,
        document: GetDiscussionsDocument,
        variables: {
          user,
          repo,
        }
      })
      return response.repository?.discussions?.edges?.map(edge => edge?.node as Discussion) ?? []
    }
  }
}