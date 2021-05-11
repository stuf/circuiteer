/* eslint-disable */
import Draggable from 'react-draggable';
import { Group } from '@visx/group';
import { withParentSizeModern } from '@visx/responsive';

import { gridToScreen } from 'common/util';
import { useGridSize } from 'common/hooks';
import { useEntities } from './hooks/useEntities';
import { EntityObject } from './components/EntityObject';
import { PatternCircles } from '@visx/pattern';
import { DiagonalPattern, GridPattern } from './components/Patterns';
import { EntityEditor } from 'containers/EntityEditor/EntityEditor';

function Canvas(props) {
  const { parentWidth: width, parentHeight: height } = props;

  const { entities, current, setCurrent } = useEntities();
  const gxy = useGridSize();

  const onSelect = id => () => setCurrent(id);

  return (
    <>
      {current && <EntityEditor />}

      <svg
        {...{ width, height }}
        className="relative"
        patternUnits="userSpaceOnUse"
        onClickCapture={() => setCurrent(null)}
        onDragOver={e => {
          e.preventDefault();
        }}
      >
        {/* Defs */}
        <GridPattern {...{ width: gxy[0], height: gxy[1] }} />
        <DiagonalPattern />

        {/* Backdrop */}
        <rect
          {...{ width, height }}
          className="pointer-events-none"
          fill="url('#grid-polkadots')"
        />

        {entities.map((entity, ix) => {
          const [x, y] = gridToScreen(gxy, entity.pos);
          const [entityWidth, entityHeight] = gridToScreen(
            gxy,
            entity.module.size,
          );

          return (
            <Draggable
              key={`entity-${ix}`}
              grid={gxy}
              cancel=".cancel"
              handle=".handle"
              defaultClassName="draggable"
              defaultClassNameDragged="dragged"
              defaultClassNameDragging="dragging"
            >
              <Group>
                <EntityObject
                  {...{
                    x,
                    y,
                    width: entityWidth,
                    height: entityHeight,
                    object: entity,
                    selected: current?.id === entity.id,
                    onSelect: onSelect(entity.id),
                  }}
                />
              </Group>
            </Draggable>
          );
        })}
      </svg>
    </>
  );
}

export default withParentSizeModern(Canvas);
