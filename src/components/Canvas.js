/**
 * @todo See if it makes sense to turn this into a stateful function component later on
 * @todo Add support for dragOver, dragLeave, dragDrop
 */
import cx from 'clsx';
import * as L from 'partial.lenses';
import { PureComponent } from 'react';
import { inspect } from 'util';
import { withParentSizeModern } from '@visx/responsive';

import { actions, preventDefault } from 'common/util';
import { CanvasUnderlay } from './CanvasUnderlay';
import { CanvasOverlay } from './CanvasOverlay';

const { abs, pow, sqrt } = Math;

/**
 * Provides the business end of the application, which is the planning
 * canvas that provides facilities for arranging, creating, editing and
 * removing elements.
 */
export class Canvas extends PureComponent {
  /** @param {ICanvasProps} props */
  constructor(props) {
    super(props);

    /** @type {ICanvasState} */
    this.state = {
      options: {
        // Minimum distance to move after pressing the mouse button until it's
        // interpreted as dragging
        minimumDragDistance: 10,

        onDragStart: props.options?.onDragStart,
        onDragMove: props.options?.onDragMove,
        onDragStop: props.options?.onDragStop,
        onDragOver: props.options?.onDragOver,
      },
      drag: null,
      objects: props.objects,

      width: props.parentWidth ?? props.width,
      height: props.parentHeight ?? props.height,
    };

    this.drag = {
      moved: false,
      distance: 0,
      origin: { x: 0, y: 0 },
    };
  }

  log = (...args) => {
    const prefix = 'Canvas';
    const logArgs = [[prefix, ':'].join(''), ...args];

    console.log(...logArgs);
  };

  getId = e => e.target.getAttribute('id');

  /**
   *
   * @param {MouseEvent} e
   * @returns
   */
  onStart = e => {
    const id = this.getId(e);

    if (!id) return;

    const object = L.get(['objects', L.find(o => o.id === id)], this.state);

    console.log(object);

    const stateʼ = L.set(
      ['drag', L.props('current', 'pos', 'size', 'origin', 'moved')],
      {
        current: id,
        pos: object.pos,
        size: object.size,
        origin: object.pos,
        moved: false,
      },
      this.state,
    );

    console.log('drag start for %s', id);

    this.drag.origin = { x: object.pos.x, y: object.pos.y };

    const maybeFn = this.state.options?.onDragStart;
    if (maybeFn && maybeFn instanceof Function) {
      this.log('call onDragStart event with event:', e);
      maybeFn(e, object);
    }

    this.setState(stateʼ);
  };

  /**
   *
   * @param {MouseEvent} e
   * @returns
   */
  onMove = e => {
    if (!this.state.drag) return;

    const minDistance = this.state.options?.minimumDragDistance;

    // const id = this.state.drag.current;

    const drag = this.state.drag;

    const s = 1; // window.devicePixelRatio;
    const dx = e.movementX / s;
    const dy = e.movementY / s;
    const x = drag.pos.x + dx;
    const y = drag.pos.y + dy;

    const movedTo = { x, y };
    const movedFrom = this.state.drag.origin;

    // Get the absolute change in position compared to origin
    const delta = {
      x: abs(movedFrom.x - movedTo.x),
      y: abs(movedFrom.y - movedTo.y),
    };

    // Calculate diagonal (distance) to origin
    const distance = sqrt(pow(delta.x, 2) + pow(delta.y, 2));

    const newState = { distance, pos: { x, y }, moved: false };

    const stateʼ = L.set(
      ['drag', L.props('distance', 'pos', 'moved')],
      newState,
      this.state,
    );

    this.setState(stateʼ);

    const maybeFn = this.state.options?.onDragMove;
    if (maybeFn && maybeFn instanceof Function) {
      maybeFn(e);
    }

    if (distance >= minDistance && !this.drag.moved) {
      this.drag.moved = true;
    }
  };

  /**
   *
   * @param {MouseEvent} e
   * @returns
   */
  onStop = e => {
    if (!this.state.drag) {
      console.log('not moving, doing nothing');
      return;
    }

    const minDistance = this.state.options.minimumDragDistance;
    const distance = this.state.drag.distance;

    if (distance < minDistance) {
      console.log('distance moved below theshold, will not update state');
      console.log('\tdistance %s < minDistance %s', distance, minDistance);
      return;
    }

    const id = this.state.drag.current;

    const stateʼ = L.transform(
      L.seq(
        ['drag', L.setOp(null)],
        [
          'objects',
          L.find(o => o.id === id),
          'pos',
          L.setOp(this.state.drag.pos),
        ],
      ),
      this.state,
    );

    const obj = L.get(['objects', L.find(o => o.id === id)], stateʼ);

    const maybeFn = this.state.options?.onDragStop;
    if (maybeFn && maybeFn instanceof Function) {
      this.log('call onDragStop with event:', e);
      maybeFn(e, obj);
    }

    this.setState(stateʼ);

    this.drag.moved = false;
  };

  onDragOver = e => {
    // console.log('onDragOver');
    const pos = { x: e.clientX, y: e.clientY };
    // console.log('x=%s, y=%s', pos.x, pos.y);
  };

  render() {
    const minDistance = this.state.options.minimumDragDistance;
    const distance = this.state.drag?.distance;
    const drag = this.state.drag;
    const size = drag?.size;
    const pos = drag?.pos;

    const showGhost = drag && distance >= minDistance;

    const ghostStyle = {
      width: size?.width,
      height: size?.height,
      transform: pos && `translateX(${pos.x}px) translateY(${pos.y}px)`,
    };

    if (!this.state.objects?.length) {
      return null;
    }

    return (
      <>
        <CanvasUnderlay width={this.state.width} height={this.state.height} />
        <CanvasOverlay width={this.state.width} height={this.state.height} />
        <div
          className="canvas"
          onMouseDownCapture={this.onStart}
          onMouseMove={this.onMove}
          onMouseUpCapture={this.onStop}
          onDragOver={actions(preventDefault, this.onDragOver)}
        >
          <div
            className="absolute"
            style={{ fontSize: 12, background: '#fff', zIndex: 1, right: 0 }}
          >
            <fieldset>
              <legend>Drag</legend>
              <pre className="font-mono">
                {inspect(this.drag, {
                  compact: 1,
                  breakLength: 5,
                  colors: false,
                })}
              </pre>
            </fieldset>

            <fieldset>
              <legend>State</legend>
              <pre>
                {inspect(this.state, {
                  colors: false,
                  compact: true,
                  depth: Infinity,
                })}
              </pre>
            </fieldset>
          </div>

          {/* If we're currently dragging, show position ghost */}
          {showGhost && (
            <div
              className="canvas__card-ghost absolute"
              style={ghostStyle}
            ></div>
          )}

          {this.state.objects.map((object, i) => {
            const { id, pos, size } = object;
            const style = {
              ...size,
              transform: `translateX(${pos.x}px) translateY(${pos.y}px)`,
            };

            return (
              <div
                key={id}
                style={{ ...style }}
                id={id}
                className={cx(
                  'canvas__card',
                  id === this.state.drag?.current && 'canvas__card--current',
                )}
              >
                card {id}
              </div>
            );
          })}
        </div>
      </>
    );
  }
}

export const AutosizeCanvas = withParentSizeModern(Canvas);

export default Canvas;
