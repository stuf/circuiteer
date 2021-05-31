import * as L from 'partial.lenses';
import { logDOM, fireEvent, logRoles, act } from '@testing-library/react';

import { render } from 'test-utils';
import { Canvas } from '../Canvas';
import { preloadedState } from 'core/preloaded';

describe('Canvas', () => {
  it('works by default somewhat', async () => {
    const initialState = L.set(['drag', 'dragging'], false, preloadedState);
    const { container, findByRole } = render(<Canvas />, { initialState });

    // expect(container).toMatchSnapshot();

    // logRoles(container);
    const canvas = await findByRole('application', { name: /editor canvas/i });

    act(() => {
      fireEvent.click(container.querySelector('.canvas__underlay'));
    });

    const dragOver = {
      preventDefault: jest.fn(),
    };

    // fireEvent.dragOver(canvas, dragOver);
    // expect(dragOver.preventDefault).toHaveBeenCalled();
  });
});
