import { render } from 'solid-js/web'
import { ErrorBoundary } from 'solid-js'
import Layout from './layout';

render(
  () => (
    <ErrorBoundary fallback={"something went wrong"}>
      <Layout/>
    </ErrorBoundary>
  ),
  document.body
)