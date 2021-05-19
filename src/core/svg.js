import { PatternCircles, PatternLines } from '@visx/pattern';
import { color } from '../config';

export const DefinePatterns = () => (
  <>
    <PatternCircles
      id="dots"
      {...{ width: 8, height: 8 }}
      radius={1.5}
      complement
      fill="#fff"
    />
    <PatternCircles
      id="dots-inverted"
      {...{ width: 8, height: 8 }}
      radius={1.5}
      complement
      className="fill-green"
    />
    <PatternLines
      id="lines"
      {...{ width: 8, height: 8 }}
      stroke="#fff"
      strokeWidth={3}
      orientation={['diagonal']}
    />
    <PatternLines
      id="lines-inverted"
      {...{ width: 8, height: 8 }}
      stroke={color.production}
      strokeWidth={3}
      orientation={['diagonal']}
    />
  </>
);

export const DefineSvgAssets = props => {
  const { width = 0, height = 0 } = props;

  return (
    <svg {...{ width, height }} className="absolute -left-1 -top-1">
      <DefinePatterns />
    </svg>
  );
};
