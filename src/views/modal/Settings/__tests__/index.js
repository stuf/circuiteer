import * as L from 'partial.lenses';
import { act, logDOM, fireEvent, logRoles } from '@testing-library/react';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';

import { render } from 'test-utils';
import { preloadedState } from 'core/preloaded';
import * as reducer from 'state';

import { SettingsModal } from '../index';

describe('SettingsModal', () => {
  test('default', async () => {
    const { container, findByRole } = render(<SettingsModal open={true} />);

    expect(container).toMatchSnapshot();
  });

  test('opens', async () => {
    const store = configureStore({
      preloadedState: L.set(
        ['modal', 'modals', 'settings'],
        true,
        preloadedState,
      ),
      reducer,
    });

    const wrapper = ({ children }) => (
      <Provider store={store}>{children}</Provider>
    );

    const res = render(<SettingsModal />, { wrapper });

    // logDOM(res.container);

    // console.log(res.container.querySelectorAll('input'));
  });
});
