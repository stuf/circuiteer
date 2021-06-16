import { BaseLayout } from 'layout';
import { Button } from 'components';
import { BuildInfo } from 'components/misc';
import { Infobar, AutosizeCanvas } from 'containers';

import { Sidebar } from './components/Sidebar';
import { useModal } from 'common/hooks';

export function Editor() {
  const settingsModal = useModal('settings');

  return (
    <BaseLayout
      header={
        <>
          <Button
            icon="settings"
            pressed={settingsModal.visible}
            onClick={settingsModal.show}
          >
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
