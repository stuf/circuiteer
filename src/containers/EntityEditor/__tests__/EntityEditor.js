import * as L from 'partial.lenses';
import { render } from 'test-utils';
import { fireEvent, createEvent, logRoles } from '@testing-library/react';
import { EntityEditor } from '../EntityEditor';
import { preloadedState } from 'core/preloaded';
import { act } from 'react-dom/test-utils';

it('should show an error if attempting to mount without having a selected entity', async () => {
  const initialState = L.set(['editor', 'current'], null, preloadedState);

  const { container, findByRole, findByText } = render(<EntityEditor />, {
    initialState,
  });

  expect(await findByRole('banner')).not.toBeUndefined();
  expect(await findByText(/something is wrong/i)).not.toBeUndefined();

  expect(container).toMatchSnapshot();
});

it('should show the editor with the current selected', async () => {
  const id = '262ec14e-940b-41b3-8c4a-6958afff5332';
  const initialState = L.set(['editor', 'current'], id, preloadedState);

  const { container, findByRole } = render(<EntityEditor />, {
    initialState,
  });

  const _id = await findByRole('definition', { name: 'ID' });
  expect(_id.textContent).toBe(id);

  expect(container).toMatchSnapshot();

  const _debug = await findByRole('switch', { name: /show debug/i });

  act(() => {
    fireEvent(_debug, createEvent.click(_debug));
  });

  await findByRole('switch', {
    name: /show debug/i,
    checked: true,
  });
});
