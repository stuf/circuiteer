import * as L from 'partial.lenses';
import {
  logDOM,
  fireEvent,
  logRoles,
  act,
  createEvent,
} from '@testing-library/react';

import { render } from 'test-utils';
import { Canvas } from '../Canvas';
import { preloadedState } from 'core/preloaded';

describe('Canvas', () => {
  it('works by default somewhat', async () => {
    const initialState = L.set(['drag', 'dragging'], false, preloadedState);
    const { container, queryByRole, queryAllByRole, findByRole } = render(
      <Canvas />,
      { initialState },
    );

    // expect(container).toMatchSnapshot();

    // logRoles(container);
    const canvas = await findByRole('application', { name: /editor canvas/i });

    act(() => {
      fireEvent.click(container.querySelector('.canvas__underlay'));
    });

    const dragOver = {
      preventDefault: jest.fn(x => {
        console.log('dragOver preventDefault', x);
      }),
    };

    const els = container.querySelector('.draggable');
    const handle = els.querySelector('.entity-object__handle');

    expect(els.classList.contains('dragging')).not.toBe(true);

    act(() => {
      fireEvent.mouseDown(handle);
    });

    expect(els.classList.contains('dragging')).toBe(true);

    act(() => {
      fireEvent.mouseMove(handle, {
        clientX: 80,
        clientY: 80,
        scrollLeft: 0,
        scrollTop: 0,
      });
    });

    act(() => {
      fireEvent.mouseUp(handle);
    });

    expect(els.classList.contains('dragging')).not.toBe(true);
    expect(els.classList.contains('dragged')).toBe(true);
  });

  it.skip('might have a working dragging', () => {
    const initialState = L.set(['drag', 'dragging'], false, preloadedState);
    const { container, queryByRole, queryAllByRole, findByRole } = render(
      <Canvas />,
      { initialState },
    );

    const svg = container.querySelector('svg');

    act(() => {
      fireEvent.dragOver(svg, { screenX: 0, screenY: 0 });
    });

    act(() => {
      fireEvent.dragEnd(svg);
    });

    act(() => {
      fireEvent.drop(svg, {
        dataTransfer: {
          getItem: () => {
            console.log('datatransfer');
            return '{ "a": 1 }';
          },
        },
      });
    });
  });
});
