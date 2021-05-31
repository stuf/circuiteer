import { act, logDOM, fireEvent } from '@testing-library/react';
import { render } from 'test-utils';
import { SettingsModal } from '../index';

describe('SettingsModal', () => {
  test('default', async () => {
    const { container } = render(<SettingsModal />);

    expect(container).toMatchSnapshot();
  });

  test('open by default', () => {
    const { container, findByText } = render(<SettingsModal open={true} />);

    // logDOM(container);

    expect(container).toMatchSnapshot();
  });
});
