import { render, logDOM, logRoles } from '@testing-library/react';
import { DefinitionList } from '../DefinitionList';

describe('DefinitionList', () => {
  test('works', async () => {
    const name = 'foo';
    const items = [
      { id: 'one', key: 'One', value: '1' },
      { id: 'two', key: 'Two', value: '2' },
    ];
    const { container, findByRole } = render(
      <DefinitionList {...{ name, items }} />,
    );

    await findByRole('definition', { name: /one/i });

    expect(container).toMatchSnapshot();
  });
});
