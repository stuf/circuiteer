import { useDispatch } from 'react-redux';

import { Info, EntityPalette } from 'components/canvas';
import { AutosizeCanvasElement } from 'containers/CanvasElement';

import { addingNew } from 'state/canvas';
import { getLogger } from 'common/logger';

import { usePowerEfficiency, useUsageObjectThings } from 'common/hooks/derived';

import { useGameLocations } from 'common/hooks/locations';
import { useOptionFlags } from 'common/hooks/options';
import { useGameEntities } from 'common/hooks/game-entities';

const logger = getLogger('app'); // eslint-disable-line

export function MainView(props) {
  const update = useDispatch();

  const canvasStuff = useUsageObjectThings();

  const gameObjects = useGameEntities();

  const location = useGameLocations();
  const power = usePowerEfficiency();
  const flags = useOptionFlags();

  const objects = Object.values(canvasStuff.entities);

  const onAddNewEntity = o => {
    console.log('onAddNewEntity', o);
    update(addingNew(o));
  };

  if (!objects?.length) {
    return (
      <div>Did you misfire a rocket? TODO: Pleasefix asap :sad: (´・ω・｀)</div>
    );
  }

  return (
    <main className="view">
      <AutosizeCanvasElement />
      <Info location={location} power={power} flags={flags} />
      <EntityPalette
        gameObjects={gameObjects}
        isCurrentlyAdding={false}
        actions={{ onAddNewEntity }}
      />
    </main>
  );
}

export default MainView;
