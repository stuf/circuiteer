import { PatternLines, PatternCircles } from '@visx/pattern';
import { Pattern as P } from 'common/constants';
import { Pattern } from 'common/settings';

export function Patterns(props) {
  return (
    <svg className="off-canvas">
      <PatternLines id={P.DIAGONAL} {...Pattern[P.DIAGONAL]} />
      <PatternCircles id={P.DOTTED_GRID} {...Pattern[P.DOTTED_GRID]} />
    </svg>
  );
}
