import { PatternLines } from '@visx/pattern';
import { Pattern as P } from 'common/constants';
import { Pattern } from 'common/settings';

export function Patterns(props) {
  return (
    <svg>
      <PatternLines id={P.DIAGONAL} {...Pattern[P.DIAGONAL]} />
    </svg>
  );
}
