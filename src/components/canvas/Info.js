import { useMemo } from 'react';
import clsx from 'clsx';

import { percent } from 'common/util';
import { EfficiencyI } from 'common/constants';

/**
 *
 * @param {import('components/canvas/Info').Props} props
 * @returns
 */
export function Info(props) {
  const { className, location, power, flags } = props;

  const locationObjects = useMemo(
    () => Object.values(location.entities),
    [location.entities],
  );

  const currentLocation = location.entities[location.current];
  const showEfficiency = useMemo(() => {
    const showEffFn = flags.flags.showEfficiencyPercentage
      ? percent
      : v => EfficiencyI[v];

    return {
      solar: showEffFn(currentLocation.solar),
      wind: showEffFn(currentLocation.wind),
    };
  }, [flags.flags.showEfficiencyPercentage, currentLocation]);

  // const powerʼ = useMemo(
  //   () => ({
  //     producers: power.producers,
  //     consumers: power.consumers,
  //   }),
  //   [power],
  // );

  const blocks = [
    {
      label: 'Location',
      body: () => (
        <div>
          <select
            value={location.current}
            onChange={e =>
              location.actions?.setCurrent &&
              location.actions.setCurrent(e.target.value)
            }
          >
            {locationObjects &&
              locationObjects.map((o, i) => (
                <option value={o.id}>{o.id}</option>
              ))}
          </select>
        </div>
      ),
    },
    {
      label: 'Another thing',
      body: () => <div>123</div>,
    },
  ];

  const cellWidths = [100, 100, 200];

  const effBlocks = [
    {
      label: 'Solar',
      body: () => <div className="info-value--big">{showEfficiency.solar}</div>,
    },
    {
      label: 'Wind',
      body: () => <div className="info-value--big">{showEfficiency.wind}</div>,
    },
    {},
  ];

  const dataBlocks = [
    {
      label: 'Power Usage',
      body: () => (
        <div className="info-value--big">{-power.sum.consumers} U/s</div>
      ),
    },
    {
      label: 'Power Prod.',
      body: () => (
        <div className="info-value--big">{power.sum.producers} U/s</div>
      ),
    },
    {
      label: 'Options',
      body: () => (
        <div className="info-value--normal space-x">
          <div className="info-checkbox">
            <input
              id="cb1"
              type="checkbox"
              checked={flags.flags.showEfficiencyPercentage}
              onChange={() =>
                flags.actions.toggleFlag('showEfficiencyPercentage')
              }
            />
            <label for="cb1">Efficiency as percentage</label>
          </div>

          <div className="info-checkbox">
            <input
              id="cb2"
              type="checkbox"
              disabled
              checked={flags.flags.showLocationAdjustedEfficiency}
              onChange={() =>
                flags.actions.toggleFlag('showLocationAdjustedEfficiency')
              }
            />
            <label for="cb2">Location efficiency</label>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className={clsx('info', className)}>
      <div className="info__header">
        <div className="info__header-title">
          Circuiteer<sub>&omega;</sub>
        </div>
      </div>
      <table className="info__table">
        <tbody>
          {blocks.map((block, i) => (
            <tr key={`block-01-${i}`} className="info__block">
              <td colSpan={3}>
                <div className="info-label">{block.label}</div>
                <div className="info-body">{block.body && block.body()}</div>
              </td>
            </tr>
          ))}

          <tr>
            {effBlocks.map((block, i) => (
              <td key={i} className="info__block" style={{ width: 100 }}>
                <div className="info-label">{block.label}</div>
                <div className="info-value">{block.body && block.body()}</div>
              </td>
            ))}
          </tr>

          <tr>
            {dataBlocks.map((block, i) => (
              <td
                key={`block-02-${i}`}
                className="info__block"
                style={{ width: cellWidths[i] }}
              >
                <div className="info-label">{block.label}</div>
                {block.body && <div className="info-value">{block.body()}</div>}
              </td>
            ))}
          </tr>
        </tbody>
      </table>
    </div>
  );
}
