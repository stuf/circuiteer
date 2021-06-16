import { render, fireEvent, logRoles, act } from '@testing-library/react';
import { Modal } from '../Modal';

test('Modal', () => {
  const fn = jest.fn();

  const { container } = render(
    <Modal open={true} onClose={fn}>
      <button onClick={fn}>close</button>
    </Modal>,
  );
});
