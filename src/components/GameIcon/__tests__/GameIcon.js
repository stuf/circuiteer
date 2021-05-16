import React from 'react';
import { render, screen } from '@testing-library/react';
import { GameIcon } from '../GameIcon';

describe('GameIcon', () => {
  test('woo hoo', () => {
    render(<GameIcon name="TierSmall" />);

    screen.debug();
  });
});
