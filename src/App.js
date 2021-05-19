import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as Views from './views';
import { DefineSvgAssets } from './core/svg';

function App() {
  return (
    <>
      <DefineSvgAssets />
      <Router>
        <Switch>
          <Route path="/sink" component={Views.Sink} />
          <Route path="/editor" component={Views.Editor} />
          <Route path="/" component={Views.Splash} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
