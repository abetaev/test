import { Component, JSXElement, Match, Switch } from "solid-js"
import "./Header.css"

type Props = { children: JSXElement, subtitle?: JSXElement }
export default (props: Props) => (
  <header>
    <Switch>
      <Match when={props.subtitle}>
        <hgroup>
          <h1>{props.children}</h1>
          <h2>{props.subtitle}</h2>
        </hgroup>
      </Match>
      <Match when={!props.subtitle}>
        <h1>{props.children}</h1>
      </Match>
    </Switch>
  </header>
)