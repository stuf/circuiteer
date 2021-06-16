import { fireEvent, logRoles } from '@testing-library/react';
import { render } from 'test-utils';
import { OptionsModal } from '../index';

describe('OptionsModal', () => {
  test('works-ish', () => {
    const { container, queryAllByRole } = render(
      <OptionsModal open={true} onClose={() => {}} />,
    );

    expect(container).toMatchSnapshot();

    fireEvent.change(container);
  });
});
