import { render, logRoles, logDOM } from '@testing-library/react';
import { scaleLinear } from '@visx/scale';
import { PowerBar, LabeledPowerBar } from '../PowerBar';

const scale = scaleLinear({
  domain: [0, 100],
  range: [0, 250],
});

test('PowerBar', () => {
  const { container } = render(
    <svg>
      <PowerBar scale={scale} raw={10} adjusted={90} top={0} height={100} />
    </svg>,
  );
});

test('LabeledPowerBar', async () => {
  const { container, findByRole } = render(
    <svg>
      <LabeledPowerBar
        {...{
          scale,
          id: 'descriptive-label',
          label: 'Descriptive label',
          raw: 10,
          adjusted: 90,
          top: 0,
          height: 100,
        }}
      />
    </svg>,
  );

  await findByRole('text', { name: /descriptive label/i });
});
