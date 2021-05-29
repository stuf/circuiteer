import cns from 'classnames';
import { Group } from 'components';

import { SidebarLocation } from 'containers/Sidebar/Location';
import { SidebarModules } from 'containers/Sidebar/Modules';
import { ShoppingList } from 'components/game';
import { useRawEntities } from 'common/hooks';

const padding = ['px-4', 'py-2'];

export function Sidebar() {
  const rawEntities = useRawEntities();

  return (
    <>
      <div className={cns('overflow-auto space-y-2 border-l-2', padding)}>
        <SidebarModules />
      </div>

      <div className={cns('overflow-hidden space-y-2 border-l-2')}>
        <div className="flex flex-col h-full">
          <div className={cns(padding)}>
            <SidebarLocation />
          </div>

          <div className={cns('flex-grow overflow-auto', padding)}>
            <ShoppingList entities={rawEntities} />
          </div>

          <div className={cns('border-t-2', padding)}>
            <Group title="Power Status">
              <div className="border-2 border-pink-500"></div>
            </Group>
          </div>
        </div>
      </div>
    </>
  );
}
