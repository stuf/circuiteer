import cx from 'clsx';
import * as L from 'partial.lenses';
import { PureComponent } from 'react';
import { inspect } from 'util';

export class Canvas extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      drag: null,
      objects: [
        {
          id: '1',
          pos: { x: 100, y: 100 },
          size: { width: 100, height: 100 },
        },
      ],
    };

    this.drag = {
      moved: false,
      isDragging: false,
      current: null,
      pos: { x: 0, y: 0 },
    };
  }

  getId = e => e.target.getAttribute('id');

  onStart = e => {
    const id = this.getId(e);

    if (!id) return;

    const object = L.get(['objects', L.find(o => o.id === id)], this.state);

    console.log(object);

    const stateʼ = L.set(
      ['drag', L.props('current', 'pos', 'size')],
      { current: id, pos: object.pos, size: object.size },
      this.state,
    );

    console.log('drag start for %s', id);

    this.setState(stateʼ);
  };

  onMove = e => {
    if (!this.state.drag) return;

    if (!this.drag.moved) {
      console.log('moving');
    }

    const id = this.state.drag.current;

    const drag = this.state.drag;

    const s = 1; // window.devicePixelRatio;
    const dx = e.movementX / s;
    const dy = e.movementY / s;
    const x = drag.pos.x + dx;
    const y = drag.pos.y + dy;
    console.log('x=%s\ty=%s\tdx=%s\tdy=%s', x, y, dx, dy);

    const stateʼ = L.set(
      ['drag', L.props('current', 'pos')],
      { current: id, pos: { x, y } },
      this.state,
    );

    this.setState(stateʼ);

    if (!this.drag.moved) {
      console.log('drag move for %s', id);
    }

    this.drag.moved = true;
  };

  onStop = e => {
    if (!this.state.drag) {
      console.log('not moving, doing nothing');
      return;
    }

    const id = this.state.drag.current;
    const object = L.get(['objects', L.find(o => o.id === id)], this.state);
    console.log('drag stop for %s', id, object);

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
    //L.set('drag', null, this.state);

    this.setState(stateʼ);

    this.drag.moved = false;
  };

  render() {
    const drag = this.state.drag;
    const size = drag?.size;
    const pos = drag?.pos;

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

        <div
          className="canvas__card-ghost absolute"
          style={{
            width: size?.width,
            height: size?.height,
            transform: pos && `translateX(${pos.x}px) translateY(${pos.y}px)`,
          }}
        ></div>

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
