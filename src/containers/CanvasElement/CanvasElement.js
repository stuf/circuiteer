import { useState, useMemo } from 'react';
import { withParentSizeModern } from '@visx/responsive';

import { getCanvasObjectStyle } from 'common/canvas';
import { show } from 'common/util';
import { useUsageObjectThings } from 'common/hooks/derived';

import { AutosizeUnderlay, Entity } from 'components/canvas';

const Action = {
  NONE: null,
  DRAG: 'drag',
};

export function CanvasElement(props) {
  const width = props.parentWidth ?? props.width;
  const height = props.parentHeight ?? props.height;

  const objects = useUsageObjectThings();
  const objectList = useMemo(
    () => Object.values(objects.entities),
    [objects.entities],
  );

  const [state, setState] = useState({
    action: Action.NONE,
  });

  const children = useMemo(
    () =>
      objectList.map((o, i) => (
        <div
          key={o.id}
          className="canvas-el__object"
          style={getCanvasObjectStyle(o)}
        >
          <Entity object={o} />
        </div>
      )),
    [objectList],
  );

  return (
    <>
      <section className="canvas-el" style={{ width, height }}>
        <div className="canvas-el__body">{children}</div>
        <AutosizeUnderlay />
      </section>
    </>
  );
}

export const AutosizeCanvasElement = withParentSizeModern(CanvasElement);
