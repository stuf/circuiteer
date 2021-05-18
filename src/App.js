import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as Views from './views';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/sink" component={Views.Sink} />
        <Route path="/editor" component={Views.Editor} />
        <Route path="/" component={Views.Splash} />
      </Switch>
    </Router>
  );
}

export default App;
