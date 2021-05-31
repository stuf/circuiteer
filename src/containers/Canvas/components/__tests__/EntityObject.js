import { fireEvent, logDOM, logRoles, act } from '@testing-library/react';
import { render } from 'test-utils';

import { EntityObject } from '../EntityObject';

const baseProps = {
  x: 0,
  y: 0,
  width: 10,
  height: 10,
  object: {
    id: '1234-5678',
  },
  module: {
    id: 'dummyModule',
  },
};

describe('EntityObject', () => {
  it('works by default', () => {
    const props = {
      ...baseProps,
      onSelect: jest.fn(),
    };

    const { container } = render(
      <svg>
        <EntityObject {...props} />
      </svg>,
    );
  });

  it('renders properly when disabled', () => {
    const props = {
      ...baseProps,
      disabled: true,
      onSelect: jest.fn(),
    };

    const { container } = render(
      <svg>
        <EntityObject {...props} />
      </svg>,
    );
  });

  it('can be selected', () => {
    const props = {
      ...baseProps,
      selected: true,
      disabled: false,
      onSelect: jest.fn(),
    };

    const { container } = render(
      <svg>
        <EntityObject {...props} />
      </svg>,
    );

    const shape = container.querySelector('.entity-object__shape');

    act(() => {
      fireEvent.click(shape);
    });
  });
});
