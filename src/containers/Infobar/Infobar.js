import * as L from 'partial.lenses';
import * as R from 'ramda';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import cx from 'classnames';

import { Toolbar } from 'containers/Toolbar';
import { Button } from 'components/Button';
import { useOptions } from 'common/hooks';
import { PowerStrengthLabel } from '../../config';

const inRange = R.curry((l, r, v) => v > l && v < r);

const Efficiency = ({ t, label, value, showRawValue }) => {
  const showValue = showRawValue
    ? value.toFixed(2)
    : t(`game:powerStrength.${PowerStrengthLabel[value]}`);

  const color = R.cond([
    [inRange(1, 2), R.always('text-green-500')],
    [inRange(0.4, 1), R.always('text-yellow-500')],
    [inRange(0.1, 0.4), R.always('text-red-500')],
  ])(value);

  const showClassName = ['flex space-x-2', color];

  return (
    <div className={cx(showClassName)}>
      <div>{label}</div>
      <div className="whitespace-nowrap">{showValue}</div>
    </div>
  );
};

export function Infobar() {
  const { t } = useTranslation();
  const opts = useOptions();

  const { locations, current } = useSelector(
    L.get(['location', L.props('locations', 'current')]),
  );
  const loc = locations.find(x => x.id === current);

  return (
    <div className="flex w-full border-b-2 px-4 py-1 items-center relative">
      <div className="space-x-1 w-full flex items-center">
        <Toolbar />
      </div>

      <div className="flex-grow"></div>

      <div className="flex space-x-4">
        <span className="font-bold">Efficiency</span>

        <Efficiency
          t={t}
          label={t('game:powerType.wind')}
          value={loc.wind}
          showRawValue={opts.flags.showEfficiencyAsMultiplier}
        />
        <Efficiency
          t={t}
          label={t('game:powerType.sun')}
          value={loc.sun}
          showRawValue={opts.flags.showEfficiencyAsMultiplier}
        />
      </div>
    </div>
  );
}
