/* eslint-disable */
import * as R from 'ramda';
import { useRef, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Group } from '@visx/group';
import { localPoint } from '@visx/event';
import { withParentSizeModern } from '@visx/responsive';
import Draggable from 'react-draggable';
import cx from 'classnames';

import { moveEntity, addEntity } from 'state/editor';
import { setDragging } from 'state/drag';
import { gridToScreen, screenToGrid } from 'common/util';
import { EntityEditor } from 'containers/EntityEditor/EntityEditor';
import { useGridSize, usePopulatedEntities } from 'common/hooks';
import { useEntities } from './hooks/useEntities';
import { useIsDragging, useDragSize } from './hooks/useDragging';
import {
  PowerStatus,
  DragGhost,
  EntityObject,
  DiagonalPattern,
  GridPattern,
} from './components';

import './Canvas.css';

export function Canvas(props) {
  const { parentWidth: width, parentHeight: height, className } = props;
  const ref = useRef(null);
  const drag = useRef([0, 0]);

  const update = useDispatch();
  const refCb = useCallback(node => {
    ref.current = node;
  }, []);

  const { entities, modules, current, setCurrent } = useEntities();
  const popEntities = usePopulatedEntities();
  const isDragging = useIsDragging();
  const dragSize = useDragSize();

  const gxy = useGridSize();

  const onSelect = id => () => setCurrent(id);

  return (
    <>
      {current && <EntityEditor />}

      <PowerStatus entities={popEntities} />

      <svg
        {...{ width, height, ref: refCb }}
        className={cx(className, 'canvas', isDragging && 'canvas--is-dragging')}
        patternUnits="userSpaceOnUse"
        onDragOver={e => {
          e.preventDefault();
          const p = localPoint(e);
          const xy = screenToGrid(gxy, [p.x, p.y]);
          if (!R.equals(xy, drag.current)) {
            drag.current = screenToGrid(gxy, [p.x, p.y]);
          }
        }}
        onDragEnd={e => {
          console.log('end it', e);
        }}
        onDrop={e => {
          const p = localPoint(e);
          const pos = screenToGrid(gxy, [p.x, p.y]);
          const { module } = JSON.parse(
            e.dataTransfer.getData('application/json'),
          );

          /** @type {IEntity} */
          const entity = {
            pos: pos,
            module: module.id,
            enabled: true,
          };

          update(addEntity(entity));
          update(setDragging(false));
        }}
      >
        {/* Defs */}
        <GridPattern {...{ width: gxy[0], height: gxy[1] }} />
        <DiagonalPattern />

        {/* Backdrop */}
        <rect
          {...{ width, height }}
          onClick={() => {
            if (current) update(setCurrent(null));
          }}
          className="canvas__underlay"
        />

        {entities.map((entity, ix) => {
          const module = modules[entity.module];
          const [x, y] = gridToScreen(gxy, entity.pos);
          const [dx, dy] = screenToGrid(gxy, [x, y]);
          const [entityWidth, entityHeight] = gridToScreen(gxy, module.size);

          return (
            <Draggable
              key={`entity-${ix}`}
              grid={gxy}
              position={{ x: dx, y: dy }}
              cancel=".cancel"
              defaultClassName="draggable"
              defaultClassNameDragged="dragged"
              defaultClassNameDragging="dragging"
              onStop={(_, d) => {
                const dxy = [d.x, d.y];
                const dxyʼ = screenToGrid(gxy, dxy);
                const xyʼ = [dx, dy];
                const xyʼʼ = [xyʼ[0] + dxyʼ[0], xyʼ[1] + dxyʼ[1]];
                update(moveEntity({ id: entity.id, pos: xyʼʼ }));
              }}
            >
              <Group>
                <EntityObject
                  {...{
                    x,
                    y,
                    width: entityWidth,
                    height: entityHeight,
                    object: entity,
                    module,
                    selected: current?.id === entity.id,
                    onSelect: onSelect(entity.id),
                  }}
                />
              </Group>
            </Draggable>
          );
        })}

        <Group className="canvas__overlay-group">
          <rect
            className="canvas__overlay"
            onDragEnd={e => {
              console.log('dragend', e);
            }}
            {...{ width, height }}
          />
          {isDragging && (
            <DragGhost grid={gxy} svgEl={ref.current} size={dragSize} />
          )}
        </Group>
      </svg>
    </>
  );
}

export default withParentSizeModern(Canvas);
