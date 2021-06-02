import { render } from '@testing-library/react';

import { Markdown } from '../Markdown';

describe('Markdown', () => {
  it('works', () => {
    const text = `# asd heading

poo poo

pee pee`;

    const { container, debug } = render(<Markdown text={text} />);

    // debug();
  });
});
