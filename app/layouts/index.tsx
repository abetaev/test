import Github from '~/integrations/github';
import Loading from './Loading';
import Roster from '../pages/account/Roster';
import Main from './Main';

export default () => (
  <Github
    auth={login => <Roster {...{ login }} />}
    loading={<Loading/>}
  >
    {client => <Main {...{ client }} />}
  </Github>
)
