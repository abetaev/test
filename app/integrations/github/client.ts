import { GraphQLClient } from 'graphql-request'
import { getSdk } from '~/integrations/github/graphql/sdk'

const url = "https://api.github.com/graphql"

export type SDK = ReturnType<typeof getSdk>

type Props = { user: string, repo: string, token: string }
export default (props: Props): SDK => {
  const requestClient = new GraphQLClient(url, {
    headers: {
      "Authorization": props.token
    }
  })
  const sdk = getSdk(requestClient)
  return sdk
}