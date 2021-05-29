import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as Views from './views';
import { DefineSvgAssets } from './core/svg';

function App() {
  const modals = useSelector(s => s.modal.modals);

  return (
    <>
      <Views.Modal.ExportModal open={modals.export} />
      <Views.Modal.SettingsModal open={modals.settings} />
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
