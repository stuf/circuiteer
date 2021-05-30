import { BaseLayout } from 'layout';
import { Button } from 'components';
import { BuildInfo } from 'components/misc';
import { Infobar, AutosizeCanvas } from 'containers';

import { Sidebar } from './components/Sidebar';

export function Editor() {
  return (
    <BaseLayout
      header={
        <>
          <Button disabled icon="settings" onClick={() => {}}>
            Settings
          </Button>
        </>
      }
    >
      <BuildInfo />

      <div className="h-full grid grid-cols-12">
        <div className="col-span-9 flex flex-col overflow-hidden">
          <Infobar />

          <div className="flex-grow relative">
            <AutosizeCanvas />
          </div>
        </div>
        <div className="col-span-3 grid grid-cols-2 h-full overflow-hidden">
          <Sidebar />
        </div>
      </div>
    </BaseLayout>
  );
}
