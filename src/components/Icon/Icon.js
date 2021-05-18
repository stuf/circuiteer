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
  name: P.string,
};

Icon.defaultProps = {};
