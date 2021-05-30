import { render, suppressPropTypeWarnings } from 'test-utils';
import { Sink } from '../index';

suppressPropTypeWarnings();

test('Sink', () => {
  const { container } = render(<Sink />);
});
