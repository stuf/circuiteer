import { render } from 'test-utils';
import { ExportModal } from '../index';

test('ExportModal', () => {
  const { container } = render(<ExportModal />);

  expect(container).toMatchSnapshot();
});
