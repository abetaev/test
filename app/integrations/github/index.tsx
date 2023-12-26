import { Match, Switch, createSignal, type JSXElement } from 'solid-js'
import '~/components/core/Loading'
import env from "~/integrations/env"
import client, { SDK } from './client'

const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${env("GITHUB_APP_CLIENT_ID")}`

const [getToken, setToken] = createSignal("")

type Props = {
  auth: (login: () => unknown) => JSXElement,
  loading: JSXElement
  children: (client: SDK) => JSXElement
}
export default (props: Props) => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("code")) {
    const code = searchParams.get("code");
    (async () => {
      const response = await fetch(`http://localhost:4320/oauth?code=${code}`, {
        method: "POST"
      })

      const params = new URLSearchParams(await response.text())
      const accessToken = params.get("access_token");
      const tokenType = params.get("token_type");
      if (!(accessToken || tokenType)) {
        console.log(window.location)
        window.location.href = `${window.location.protocol}//${window.location.host}${window.location.pathname}`
        return
      }

      setToken(`${params.get("token_type")} ${params.get("access_token")}`)
    })()
  }
  return (
    <Switch
      fallback={props.auth(() => window.location.href = AUTH_URL)}>
      <Match when={getToken()}>
        {props.children(client({ "repo": "test", "user": "abetaev", token: getToken() }))}
      </Match>
      <Match when={searchParams.get("code")}>
        {props.loading}
      </Match>
    </Switch>
  )
}