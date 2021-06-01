import { logRoles } from '@testing-library/react';
import { render } from 'test-utils';
import { ImportModal } from '../index';

describe('ImportModal', () => {
  it('works-ish', () => {
    const { container } = render(<ImportModal />);
  });
});
