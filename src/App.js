import cx from 'classnames';

import css from './App.module.css';
import { Canvas } from 'containers/Canvas/index';
import Options from './_/Options';
import Sidebar from './_/Sidebar';
import Infobar from './_/Infobar';

function App() {
  return (
    <main className="h-full flex flex-col overflow-hidden">
      <header className={cx(css.mainHeader, 'border-b-2')}>
        <header className="font-black pl-4 flex">
          <div>Circuiteer</div>
          <div className="text-xxs font-normal pl-2">Experimental</div>
        </header>

        <div className="flex-1" />

        <Options />
      </header>

      <div className="flex h-full relative">
        <div className="flex-1 flex flex-col">
          <Infobar />

          <div className="flex-1 relative">
            <Canvas />
          </div>
        </div>
        <div className="border-l-2 w-72 divide-y-2 h-full overflow-auto">
          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export default App;
