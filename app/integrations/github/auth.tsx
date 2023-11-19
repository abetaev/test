import { JSXElement, Show, createEffect, createSignal } from "solid-js"
import env from "~/integrations/env"

const [getToken, setToken] = createSignal("")
type Props = {children: (token: string) => JSXElement}
export default (props: Props) => (
  <Show when={getToken()} fallback={<Auth/>}>
    {props.children(getToken())}
  </Show>
)

const AUTH_URL = `https://github.com/login/oauth/authorize?client_id=${env("GITHUB_APP_CLIENT_ID")}`
const Auth = () => {
  const searchParams = new URLSearchParams(window.location.search);
  if (searchParams.get("code")) {
    const code = searchParams.get("code");
    createEffect(async () => {
      const response = await fetch(`http://localhost:4320/oauth?code=${code}`, {
        method: "POST"
      })

      const params = new URLSearchParams(await response.text())
      const accessToken = params.get("access_token");
      const tokenType = params.get("token_type");
      if (!(accessToken || tokenType))
        return
      setToken(`${params.get("token_type")} ${params.get("access_token")}`)
    })
  }
  return (
    <a href={AUTH_URL}>authenticate with github</a>
  )
}