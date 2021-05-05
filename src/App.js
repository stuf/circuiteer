import cx from 'classnames';

import Canvas from 'canvas/Canvas';
import PowerStatus from 'canvas/PowerStatus';
import Options from './_/Options';
import Toggle from './_/Toggle';
import Sidebar from './_/Sidebar';
import css from './App.module.css';

function App() {
  return (
    <main className="h-full flex flex-col overflow-hidden">
      <header className={cx(css.mainHeader, 'border-b-2')}>
        <div className="flex-1" />
        <Options />
      </header>

      <div className="flex h-full">
        <div className="flex-1 relative h-full">
          <PowerStatus className="absolute left-1/2 shadow-lg transform -translate-x-1/2 bg-white top-2 rounded-md px-2 border-2 text-center" />
          <Canvas />
        </div>
        <div className="border-l-2 w-72 divide-y-2 h-full overflow-scroll">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export default App;
