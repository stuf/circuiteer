import React from 'react';
import { render, screen, getAllByRole, logDOM } from '@testing-library/react';
import { Marker } from '../Marker';

describe('Marker', () => {
  it('prints text as-is without a pattern', () => {
    render(<Marker text="Foobar" />);

    const el = screen.getByTestId('no-highlight-or-pattern');

    expect(el.textContent).toBe('Foobar');
    expect(el).toHaveClass('marker--no-highlight-or-pattern');
  });

  it('prints text as-is with a pattern but highlighting disabled', () => {
    render(<Marker text="Foobar" pattern={/oob/} />);

    const el = screen.getByTestId('no-highlight-or-pattern');
    expect(el).toBeTruthy();
    expect(el).toHaveClass('marker--no-highlight-or-pattern');
    expect(el.textContent).toBe('Foobar');
  });

  it('renders text as-is when no matches found', () => {
    render(<Marker text="Foobar" highlight pattern={/agga/} />);

    const el = screen.getByTestId('no-match');
    expect(el.textContent).toBe('Foobar');
    expect(el).toHaveClass('marker--no-match');
  });

  it('renders text split at found pattern', () => {
    render(<Marker text="Foobar" pattern={/oba/} highlight />);

    const el = screen.getByTestId('found-match');
    expect(el.children).toHaveLength(3);
    expect(el.textContent).toBe('Foobar');

    expect(screen.getByTestId('left').textContent).toBe('Fo');
    expect(screen.getByTestId('mid').textContent).toBe('oba');
    expect(screen.getByTestId('right').textContent).toBe('r');
  });
});
