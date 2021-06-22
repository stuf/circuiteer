import { useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { useCanvasObjects } from 'common/hooks/objects';
import { AutosizeCanvas } from 'components/Canvas';
import { ModulePalette } from 'components/ModulePalette';
import { updateObject } from 'state/objects';

export function MainView(props) {
  const { objects, ids, entities } = useCanvasObjects();
  const update = useDispatch();

  console.log({ objects, ids, entities });

  const onDragStop = useCallback(
    (e, o) => {
      console.log('onDragStop: update object', o);
      update(updateObject(o));
    },
    [update],
  );

  const onDragStart = useCallback((e, o) => {
    console.log('onDragStart in MainView', { e, o });
    console.log('onDragStart');
  }, []);

  if (!objects?.length) {
    return <div>nothing</div>;
  }

  return (
    <main className="view">
      <AutosizeCanvas objects={objects} options={{ onDragStop, onDragStart }} />
      <ModulePalette className="bottom-right absolute" />
    </main>
  );
}

export default MainView;
