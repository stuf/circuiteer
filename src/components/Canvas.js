import cx from 'clsx';
import * as L from 'partial.lenses';
import { PureComponent } from 'react';
import { inspect } from 'util';

const { abs, pow, sqrt } = Math;

export class Canvas extends PureComponent {
  /**
   *
   * @param {ICanvasProps} props
   */
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
      },
      drag: null,
      objects: [
        {
          id: '1',
          pos: { x: 100, y: 100 },
          size: { width: 100, height: 100 },
        },
        { id: '2', pos: { x: 150, y: 150 }, size: { width: 200, height: 200 } },
      ],
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
      maybeFn(e);
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

    const id = this.state.drag.current;

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
    const distance = sqrt(pow(delta.x, 2), pow(delta.y, 2));

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
    console.log('drag stop for %s', id);

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

    const maybeFn = this.state.options?.onDragStop;
    if (maybeFn && maybeFn instanceof Function) {
      this.log('call onDragStop with event:', e);
      maybeFn(e);
    }

    this.setState(stateʼ);

    this.drag.moved = false;
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

    return (
      <div
        className="canvas"
        onMouseDownCapture={this.onStart}
        onMouseMove={this.onMove}
        onMouseUpCapture={this.onStop}
      >
        <div
          className="absolute"
          style={{ fontSize: 12, background: '#fff', zIndex: 1, right: 0 }}
        >
          <fieldset>
            <legend>Drag</legend>
            <pre>{inspect(this.drag, { colors: false })}</pre>
          </fieldset>

          <fieldset>
            <legend>State</legend>
            <pre>{inspect(this.state, { colors: false, depth: Infinity })}</pre>
          </fieldset>
        </div>

        {/* If we're currently dragging, show position ghost */}
        {showGhost && (
          <div className="canvas__card-ghost absolute" style={ghostStyle}></div>
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
              card {i + 1}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Canvas;
