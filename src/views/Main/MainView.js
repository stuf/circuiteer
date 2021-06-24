import { useCallback } from 'react';
import { useDispatch } from 'react-redux';

import { useCanvasGameObjects, usePowerEfficiency } from 'common/hooks/derived';
import { AutosizeCanvas } from 'containers/Canvas';
import { Info } from 'components/canvas';

import { updateObject } from 'state/objects';
import { appLog as logger } from 'common/logger';
import { useGameLocations } from 'common/hooks/locations';

export function MainView(props) {
  const update = useDispatch();

  const { ids, entities } = useCanvasGameObjects({ useEntitySize: true }); // eslint-disable-line
  const location = useGameLocations();
  const power = usePowerEfficiency();

  const objects = Object.values(entities);

  const onDragStop = useCallback(
    (e, o) => {
      logger.info(
        'onDragStop called with object `%s` in position: x=%s, y=%s',
        o.id,
        o.pos.x,
        o.pos.y,
      );
      update(updateObject(o));
    },
    [update],
  );

  const onDragStart = useCallback((e, o) => {
    logger.info('onDragStart called with object `%s`', o.id);
    // console.log('onDragStart in MainView', { e, o });
    // console.log('onDragStart');
  }, []);

  const entityActions = {
    toggleObjectLock: () => {
      alert('lock it');
    },
    toggleObjectDisabled: () => {
      alert('disable it');
    },
  };

  if (!objects?.length) {
    return <div>nothing</div>;
  }

  return (
    <main className="view">
      <AutosizeCanvas
        objects={objects}
        options={{ onDragStop, onDragStart, entityActions }}
      />
      <Info location={location} power={power} />
    </main>
  );
}

export default MainView;
