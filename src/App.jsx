import { MainView } from './views/Main';
import { useApplicationBootstrap } from './core/bootstrap';

function App() {
  // Bootstrap
  useApplicationBootstrap();

  return <MainView />;
}

export default App;
