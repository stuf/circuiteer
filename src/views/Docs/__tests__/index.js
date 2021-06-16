import { BrowserRouter as Router } from 'react-router-dom';
import { act } from '@testing-library/react';
import { render } from 'test-utils';

import { Docs } from '../index';

describe('Docs', () => {
  it.skip('renders a base layout', () => {
    let result;

    window.addEventListener('popstate', e => {
      console.log('poopstate', e);
    });

    act(() => {
      window.history.pushState({}, 'Docs', '/docs');
    });

    act(() => {
      result = render(<Docs />, { router: { path: '/docs' }, wrapper: Router });
    });

    const { debug, container } = result;

    debug();
  });
});
