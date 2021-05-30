import { render } from 'test-utils';
import { SettingsModal } from '../index';

test('SettingsModal', () => {
  const { container } = render(<SettingsModal />);

  expect(container).toMatchSnapshot();
});
