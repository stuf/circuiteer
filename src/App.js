import cx from 'classnames';

import css from './App.module.css';
import Options from './_/Options';
import Toggle from './_/Toggle';
import Canvas from './canvas/Canvas';
import Sidebar from './_/Sidebar';

function App() {
  // // eslint-disable-next-line

  // const entities = state.entities.map(it =>
  //   L.set('module', state.modules[it.type], it),
  // );
  // console.log({ entities });

  return (
    <main className="h-full flex flex-col">
      <header className={cx(css.mainHeader, 'border-b-2')}>
        <div className="flex-1" />
        <Options />
      </header>

      <div className="flex h-full">
        <div className="flex-1">
          <Canvas />
        </div>
        <div className="border-l-2 w-72 divide-y-2">
          <fieldset>
            <legend>Le Merde</legend>

            <Toggle label="Toggle 1" />
          </fieldset>

          <Sidebar />
        </div>
      </div>
    </main>
  );
}

export default App;
