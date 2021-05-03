import { useContext } from 'react';

import { Canvas, Sidebar, PowerMeter } from './components';
import { State } from './state';

function App() {
  // eslint-disable-next-line
  const { state, setState } = useContext(State);

  return (
    <main className="h-full flex">
      <div className="flex-1 flex">
        <div className="flex-1 relative">
          <Canvas entities={state.entities} gridSize={state.canvas.grid} />
          <PowerMeter />
        </div>
        <div className="w-64">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export default App;
