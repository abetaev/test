import { request } from 'graphql-request'
import { Discussion, GetDiscussionsDocument } from '../graphql'

type Repository = {
  discussions(): Promise<Discussion[]>
}

const url = "https://api.github.com/graphql"

export default (user: string, repo: string, token: string): Repository => {
  
  return {
    discussions: async () => {
      const response = await request({
        url,
        document: GetDiscussionsDocument,
        variables: {
          user,
          repo,
        },
        requestHeaders: {
          "Authorization": token
        }
      })
      return response.repository?.discussions?.edges?.map(edge => edge?.node as Discussion) ?? []
    }
  }
}