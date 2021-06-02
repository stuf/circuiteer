import { render } from 'test-utils';
import { OptionsModal } from '../index';

test('OptionsModal', () => {
  const { container } = render(<OptionsModal open={true} onClose={() => {}} />);

  expect(container).toMatchSnapshot();
});
