import { EntityPalette } from 'components/canvas';
import { AutosizeCanvasElement, InfoPanel, Menu, MenuToggle } from 'containers';

import { getLogger } from 'common/logger';

import {
  useNormalizedGameObjects,
  usePowerEfficiency,
  useUsageObjectThings,
} from 'common/hooks/derived';

import { useGameLocations } from 'common/hooks/locations';
import { useOptionFlags } from 'common/hooks/options';
import { useCanvasState } from 'common/hooks/canvas';

const logger = getLogger('app'); // eslint-disable-line

export function MainView() {
  const canvasStuff = useUsageObjectThings();
  const canvasState = useCanvasState();

  const gameObjects = useNormalizedGameObjects();

  const location = useGameLocations();
  const power = usePowerEfficiency();
  const flags = useOptionFlags();

  const objects = Object.values(canvasStuff.entities);

  if (!objects?.length) {
    return (
      <div>Did you misfire a rocket? TODO: Pleasefix asap :sad: (´・ω・｀)</div>
    );
  }

  return (
    <main className="view">
      <AutosizeCanvasElement />
      <InfoPanel />
      <EntityPalette
        isAdding={canvasState.flags.isAddingNew}
        gameObjects={gameObjects}
        isCurrentlyAdding={false}
      />

      <MenuToggle />
      <Menu />
    </main>
  );
}

export default MainView;
