import { render } from '@testing-library/react';
import { DragGhost } from '../DragGhost';

describe('DragGhost', () => {
  test('works', () => {
    const svgEl = document.createElement('svg');

    const props = {
      grid: [8, 8],
      size: [2, 2],
      svgEl,
    };

    render(
      <svg>
        <DragGhost {...props} />
      </svg>,
    );
  });
});
