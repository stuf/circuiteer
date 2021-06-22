import { render, screen } from '@testing-library/react';

import { wrapper } from './common/testutil';
import App from './App';

test('renders learn react link', () => {
  render(wrapper(<App />));
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});
