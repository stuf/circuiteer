import * as L from 'partial.lenses';
import { useSelector } from 'react-redux';
import cx from 'classnames';

import Canvas from 'canvas/Canvas';
import Options from './_/Options';
import Sidebar from './_/Sidebar';
import EntityEditor from './_/EntityEditor';
import css from './App.module.css';
import PowerMeter from 'canvas/_/PowerMeter';

function App() {
  const currentId = useSelector(L.get(['editor', 'current']));
  const showEditor = !!currentId;

  return (
    <main className="h-full flex flex-col overflow-hidden">
      <header className={cx(css.mainHeader, 'border-b-2')}>
        <div className="flex-1" />
        <Options />
      </header>

      <div className="flex h-full relative">
        <div className="flex-1 relative h-full">
          {showEditor && (
            <div className="absolute top-2 right-2 bg-white rounded-md border-2 shadow-lg w-56">
              <EntityEditor />
            </div>
          )}
          <PowerMeter />
          {/* <PowerStatus className="absolute left-1/2 shadow-lg transform -translate-x-1/2 bg-white top-2 rounded-md px-2 border-2 text-center" /> */}
          <Canvas />
        </div>
        <div className="border-l-2 w-72 divide-y-2 h-full overflow-auto">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export default App;
