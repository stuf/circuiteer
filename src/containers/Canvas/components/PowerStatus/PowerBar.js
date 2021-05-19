import { Group } from '@visx/group';

export function PowerBar(props) {
  const { top, scale, height, raw, adjusted } = props;
  const adjustedʼ = adjusted;
  const rawʼ = raw;

  const isEqual = raw === adjusted;

  const scaledRaw = !isEqual ? scale(rawʼ) : rawʼ;
  const scaledAdjusted = !isEqual ? scale(adjustedʼ) : rawʼ;

  const xMaxima = Math.max(scaledRaw, scaledAdjusted);

  const _raw = {
    x: 0,
    width: scale(raw),
    height,
  };

  const _adjusted = !isEqual
    ? {
        x: raw < adjusted ? scaledRaw : scaledRaw - scaledAdjusted,
        width: Math.abs(scaledRaw - scaledAdjusted),
        height,
        fill: raw < adjusted ? 'url("#lines-inverted")' : 'url("#dots")',
      }
    : {};

  return (
    <Group top={top}>
      <rect {..._raw} className="fill-green" />
      <text
        y={height / 2}
        dx={8}
        fill="#fff"
        className="font-bold"
        style={{ filter: 'drop-shadow(0 1px 1px #000)' }}
      >
        <tspan style={{ alignmentBaseline: 'middle' }}>{raw}</tspan>
      </text>

      {!isEqual && <rect {..._adjusted} />}
    </Group>
  );
}

export function LabeledPowerBar(props) {
  const { label, className, top, left, scale, height, raw, adjusted } = props;

  return (
    <Group {...{ className, top, left }}>
      <text>
        <tspan>{label}</tspan>
      </text>
      <PowerBar {...{ scale, height, raw, adjusted, top: 4 }} />
    </Group>
  );
}
