import Github from '~/integrations/github';
import Loading from './Loading';
import Login from './Login';
import Main from './Main';

export default () => (
  <Github
    auth={login => <Login {...{ login }} />}
    loading={<Loading/>}
  >
    {client => <Main {...{ client }} />}
  </Github>
)
