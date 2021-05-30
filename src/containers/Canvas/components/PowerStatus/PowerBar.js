import * as P from 'prop-types';
import { Group } from '@visx/group';

const round = n => Math.round(n * 10e1) / 10e1;

/**
 * Renders a single power indication bar in the provided scale.
 *
 * @param {Props} props
 * @returns
 */
export function PowerBar(props) {
  const { top, scale, height, raw, adjusted } = props;
  const adjustedʼ = adjusted;
  const rawʼ = raw;

  const isEqual = raw === adjusted;

  const scaledRaw = round(scale(rawʼ));
  const scaledAdjusted = round(
    !isEqual ? round(scale(adjustedʼ)) : round(rawʼ),
  );
  const ratio = scaledAdjusted / scaledRaw;

  const _raw = {
    x: scale(0),
    width: scaledRaw,
    height,
  };

  const _adjusted = !isEqual
    ? {
        x: raw < adjusted ? scaledRaw : scaledRaw - scaledAdjusted,
        width: Math.abs(scaledRaw - scaledAdjusted),
        height,
        fill: ratio >= 1 ? '#047857' : '#eee',
      }
    : {};

  const rawVal = {};

  if (ratio === 1) {
    rawVal.x = scaledAdjusted;
  } else if (ratio < 1) {
    rawVal.x = scaledRaw - scaledAdjusted;
  } else if (ratio > 1) {
    rawVal.x = scaledAdjusted;
  }

  return (
    <Group top={top} role="graphics-object">
      <rect {..._raw} className="fill-green" />
      {!isEqual && <rect {..._adjusted} />}

      {!isEqual && (
        <text
          role="graphics-dataunit"
          className="barval"
          {...rawVal}
          y={height / 2}
          dx={-4}
        >
          <tspan>{round(ratio * 100)}%</tspan>
        </text>
      )}

      {!isEqual && (
        <text className="barval" x={scaledRaw} y={height / 2} dx={-4}>
          <tspan>100%</tspan>
        </text>
      )}

      {isEqual && (
        <text className="barval" x={scaledRaw} y={height / 2} dx={-4}>
          <tspan>100%</tspan>
        </text>
      )}
    </Group>
  );
}

PowerBar.propTypes = {
  top: P.number,
  scale: P.func.isRequired,
  height: P.number.isRequired,
  raw: P.number,
  adjusted: P.number,
};

export function LabeledPowerBar(props) {
  const { id, label, className, top, left, scale, height, raw, adjusted } =
    props;

  return (
    <Group
      role="graphics-object"
      id={`${id}-group`}
      aria-label={label}
      {...{ className, top, left }}
    >
      <text role="text" aria-label={label} id={id}>
        <tspan>{label}</tspan>
      </text>
      <PowerBar
        aria-labelledby={id}
        {...{ label, scale, height, raw, adjusted, top: 4 }}
      />
    </Group>
  );
}

LabeledPowerBar.propTypes = {
  id: P.string.isRequired,
  label: P.string.isRequired,
  className: P.string,
  top: P.number,
  left: P.number,
  height: P.number.isRequired,
  scale: P.func.isRequired,
  raw: P.number,
  adjusted: P.number,
};
