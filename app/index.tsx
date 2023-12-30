import { ErrorBoundary, JSXElement } from 'solid-js';
import { render } from 'solid-js/web';
import Roster from './pages/account/Roster';
import runtime from './services';

runtime.navigation.show(() => <Roster/>)

render(
  () => (
    <ErrorBoundary fallback={"something went wrong"}>
      {runtime.navigation.view()}
    </ErrorBoundary>
  ),
  document.body
)