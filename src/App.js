import { useSelector } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import * as Views from './views';
import { DefineSvgAssets } from './core/svg';

function App() {
  const modals = useSelector(s => s.modal.modals);

  console.log({ modals });

  return (
    <>
      <Views.Modal.ExportModal open={modals.export} />
      <Views.Modal.SettingsModal open={modals.settings} />
      <Views.Modal.ImportModal open={modals.import} />

      <DefineSvgAssets />

      <Router>
        <Switch>
          <Route path="/docs" component={Views.Docs} />
          <Route path="/editor" component={Views.Editor} />
          <Route path="/" component={Views.Splash} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
