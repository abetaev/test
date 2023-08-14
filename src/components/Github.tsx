import { JSX, JSXElement, Show, createEffect, createSignal, createUniqueId, mergeProps, splitProps } from 'solid-js';
import type { GithubClient } from '~/integrations/github';
import createGithubClient from '~/integrations/github';

const BASE_URL = "https://github.com/login/oauth/authorize"

const [getToken, setToken] = createSignal<string>()
type Props = {
  location?: string
  clientId: string
  authURL: string
  user: string
  repo: string

  fallback: (
    LoginButton: (props: JSX.HTMLAttributes<HTMLButtonElement>) => JSXElement
  ) => JSXElement

  children: (
    github: GithubClient,
    LogoutButton: (props: JSX.HTMLAttributes<HTMLButtonElement>) => JSXElement
  ) => JSXElement
} & Omit<JSX.HTMLAttributes<HTMLButtonElement>, "children">
export default (props: Props) => {
  const id = createUniqueId()
  // ! entanglement
  const [isBusy, setBusy] = createSignal(true)
  const [localProps, remote] = splitProps(props, ["fallback", "location"])
  const [authProps, other] = splitProps(remote, ["clientId", "authURL", "children"])
  const [clientProps, globalButtonProps] = splitProps(other, ["user", "repo"])
  createEffect(async () => {
    const url = new URL(document.URL)
    const code = url.searchParams.get("code")
    if (code) {
      url.searchParams.delete("code")
      history.pushState({}, '', url.toString())
      location.assign("#" + id)
      const authURL = `${authProps.authURL}?${new URLSearchParams({ code }).toString()}`
      const response = await fetch(authURL)
      const responseParams = new URLSearchParams(await response.text())
      const access_token = responseParams.get("access_token")
      const token_type = responseParams.get("token_type")
      setToken(`${token_type} ${access_token}`)

    } else setBusy(false)
  })

  const login = () => {
    const query = new URLSearchParams({
      client_id: authProps.clientId,
      redirect_uri: getRedirectUri(localProps.location),
      scope: "public_repo"
    })
    const target = `${BASE_URL}?${query.toString()}`
    window.location.assign(target)
  }

  const logout = () => {
    () => setToken()
  }


  const Button = (localButtonProps: JSX.HTMLAttributes<HTMLButtonElement>) => (
    <button
      id={id}
      onClick={login}
      aria-busy={isBusy() ? "true" : "false"}
      {...globalButtonProps} {...localButtonProps}
      disabled={isBusy()}
    />
  )

  return (
    <Show when={getToken()}
      fallback={localProps.fallback(
        (localButtonProps) => <Button onClick={login} {...globalButtonProps} {...localButtonProps} />
      )}
    >
      {
        authProps.children(
          // github client
          createGithubClient(mergeProps(clientProps, { auth: getToken() as string })),
          // logout button
          (localButtonProps) => <Button onClick={logout} {...globalButtonProps} {...localButtonProps} />
        )
      }
    </Show >
  )
}

// utils

function getRedirectUri(location?: string): string {
  const url = new URL(document.URL)
  if (location) {
    url.pathname = location
  }
  url.hash = ""
  return url.toString()
}