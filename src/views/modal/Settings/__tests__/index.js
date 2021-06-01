import { act, logDOM, fireEvent, logRoles } from '@testing-library/react';
import { render } from 'test-utils';
import { SettingsModal } from '../index';

describe('SettingsModal', () => {
  test('default', async () => {
    const { container, findByRole } = render(<SettingsModal open={true} />);

    expect(container).toMatchSnapshot();

    // logRoles(container);
  });

  test('opens', async () => {
    let result;

    act(() => {
      result = render(<SettingsModal open />);
    });

    const { container, findByRole } = result;
  });
});
