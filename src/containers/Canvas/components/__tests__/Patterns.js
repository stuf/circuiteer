import { render } from '@testing-library/react';
import { DiagonalPattern, GridPattern } from '../Patterns';

describe('Patterns', () => {
  test('GridPattern', () => {
    const props = {
      width: 10,
      height: 10,
    };

    render(
      <svg>
        <GridPattern {...props} />
      </svg>,
    );
  });

  test('DiagonalPattern', () => {
    const props = {};

    render(
      <svg>
        <DiagonalPattern {...props} />
      </svg>,
    );
  });
});
