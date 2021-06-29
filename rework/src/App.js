import { MainView } from './views/Main';
import { useDebugObjects } from './common/hooks/dev';

function App() {
  useDebugObjects();

  return <MainView />;
}

export default App;
