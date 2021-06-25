import * as L from 'partial.lenses';
import { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AutosizeCanvas } from 'containers/Canvas';
import { Info, EntityPalette } from 'components/canvas';
import { AutosizeCanvasElement } from 'containers/CanvasElement';

import { addingNew } from 'state/canvas';
import { addObject, updateObject } from 'state/objects';
import { getLogger } from 'common/logger';

import { useCanvasState } from 'common/hooks/canvas';
import {
  useNormalizedGameObjects,
  usePowerEfficiency,
  useUsageObjectThings,
} from 'common/hooks/derived';

import { useGameLocations } from 'common/hooks/locations';
import { useOptionFlags } from 'common/hooks/options';
import { useGameEntities } from 'common/hooks/game-entities';
import { useCanvasObjects } from 'common/hooks/objects';
import { normalize } from 'common/util';

const logger = getLogger('app');

export function MainView(props) {
  const update = useDispatch();

  const canvasStuff = useUsageObjectThings();

  const gameObjects = useGameEntities();

  // const asd = useCanvasGameObjects({ useEntitySize: true }); // eslint-disable-line
  const location = useGameLocations();
  const power = usePowerEfficiency();
  const flags = useOptionFlags();

  // const objects = Object.values(entities);
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
