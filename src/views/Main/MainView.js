import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useCanvasGameObjects, usePowerEfficiency } from 'common/hooks/derived';
import { AutosizeCanvas } from 'containers/Canvas';
import { Info } from 'components/canvas';

import { updateObject } from 'state/objects';
import { getLogger } from 'common/logger';
import { useGameLocations } from 'common/hooks/locations';
import { useOptionFlags } from 'common/hooks/options';

const logger = getLogger('app');

export function MainView(props) {
  const update = useDispatch();

  const { ids, entities } = useCanvasGameObjects({ useEntitySize: true }); // eslint-disable-line
  const location = useGameLocations();
  const power = usePowerEfficiency();
  const flags = useOptionFlags();

  const objects = Object.values(entities);

  const onDragStop = useCallback(
    (e, o) => {
      logger.info('update object `%s` in state', o.id);
      update(updateObject(o));
    },
    [update],
  );

  const onDragStart = useCallback((e, o) => {
    // logger.info('onDragStart called with object `%s`', o.id);
    // console.log('onDragStart in MainView', { e, o });
    // console.log('onDragStart');
  }, []);

  const entityActions = {
    toggleObjectLock: () => {},
    toggleObjectDisabled: () => {},
  };

  if (!objects?.length) {
    return (
      <div>Did you misfire a rocket? TODO: Pleasefix asap :sad: (´・ω・｀)</div>
    );
  }

  return (
    <main className="view">
      <AutosizeCanvas
        objects={objects}
        options={{ onDragStop, onDragStart, entityActions }}
      />
      <Info location={location} power={power} flags={flags} />
    </main>
  );
}

export default MainView;
