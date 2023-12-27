import { ErrorBoundary, JSXElement } from 'solid-js';
import { render } from 'solid-js/web';
import Roster from './components/account/Roster';
import runtime from './services';

runtime.navigation.show(() => <Roster/>)

render(
  () => (
    <ErrorBoundary fallback={"something went wrong"}>
      {runtime.navigation.view() as unknown as JSXElement}
    </ErrorBoundary>
  ),
  document.body
)