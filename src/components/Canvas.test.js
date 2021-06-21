import {
  render,
  screen,
  fireEvent,
  createEvent,
  act,
} from '@testing-library/react';
import { Canvas } from './Canvas';

test('basic smoke test', () => {
  const res = render(<Canvas />);
});

test('logging', () => {
  const asd = new Canvas({ options: {} });
  const log = console.log;
  console.log = () => {};
  asd.log('asd');
  console.log = log;
});

test('dragging handlers', () => {
  /** @type {ICanvasProps} */
  const props = {
    options: {
      onDragMove: jest.fn(),
      onDragStart: jest.fn(),
      onDragStop: jest.fn(),
    },
  };

  const { container } = render(<Canvas {...props} />);

  const canvas = container.querySelector('.canvas');

  act(() => {
    fireEvent.mouseDown(canvas, { target: canvas });
  });

  act(() => {
    fireEvent.mouseMove(canvas, { target: canvas, movementX: 1, movementY: 1 });
  });

  act(() => {
    fireEvent.mouseUp(canvas, { target: canvas });
  });
});
