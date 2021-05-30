import * as P from 'prop-types';
import { PatternCircles, PatternLines } from '@visx/pattern';

export function GridPattern(props) {
  const defaultStyle = {
    stroke: 'rgba(0, 0, 0, 0.2)',
    strokeWidth: 1,
    fill: 'none',
  };

  const { width, height, style = defaultStyle } = props;

  return (
    <PatternCircles
      id="grid-polkadots"
      {...{ width: width + 1, height: height + 1 }}
      radius={2}
      {...style}
    />
  );
}

GridPattern.propTypes = {
  width: P.number.isRequired,
  height: P.number.isRequired,
  style: P.object,
};

//

export function DiagonalPattern(props) {
  const defaultStyle = {
    stroke: 'rgba(0, 0, 0, 0.1)',
    strokeWidth: 6,
  };

  const { width = 16, height = 16, style = defaultStyle } = props;

  return (
    <PatternLines
      id="lines-diagonal"
      {...{ width, height }}
      orientation={['diagonal']}
      {...style}
    />
  );
}
DiagonalPattern.propTypes = {
  width: P.number,
  height: P.number,
  style: P.object,
};
