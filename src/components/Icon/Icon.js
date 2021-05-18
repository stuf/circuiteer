import * as P from 'prop-types';

import './Icon.css';

export function Icon(props) {
  const { name } = props;

  return (
    <span className="icon icon--ui">
      <span className="material-icons material-icons-outlined">{name}</span>
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
