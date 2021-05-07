import { useSelector } from 'react-redux';
import { LightningBoltIcon } from '@heroicons/react/solid';
import cx from 'classnames';

import css from './App.module.css';
import Canvas from 'canvas/Canvas';
import PowerMeter from 'canvas/_/PowerMeter';
import Options from './_/Options';
import Sidebar from './_/Sidebar';
import EntityEditor from './_/EntityEditor';
import Button from '_/Button';
import { showSelectedEntityIn, optionFlagsIn } from 'common/selectors';

function App() {
  const showEditor = useSelector(showSelectedEntityIn);
  const flags = useSelector(optionFlagsIn);

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
          <div className="border-b-2 px-4 py-1 space-x-1">
            <Button icon={LightningBoltIcon}>Power</Button>
            <Button>Poop</Button>
          </div>

          <div className="flex-1 relative">
            {showEditor && flags.showEditor && (
              <div className="absolute top-2 right-2 bg-white rounded-md border-2 shadow-lg w-56">
                <EntityEditor />
              </div>
            )}

            {flags.showPowerStatus && <PowerMeter />}

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
