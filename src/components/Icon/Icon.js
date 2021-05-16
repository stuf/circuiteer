import * as P from 'prop-types';
import * as icons from './icons';

import './Icon.css';

export function Icon(props) {
  const { name } = props;

  const _icon = icons[name];

  if (!_icon) {
    console.log('Invalid icon %s', name, { icons });
    return <div>Invalid</div>;
  }

  const IconSvg = _icon;

  return (
    <span className="icon icon--ui">
      <IconSvg className="icon__el" />
    </span>
  );
}

Icon.propTypes = {
  wrap: P.bool,
  nowrap: P.bool,
  name: P.string,
  size: P.number,
};

Icon.defaultProps = {
  wrap: true,
  size: 24,
};
