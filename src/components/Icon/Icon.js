import * as P from 'prop-types';

import './Icon.css';

export function Icon(props) {
  const { name, size = 24 } = props;

  return (
    <span
      className="icon icon--uiflex items-center justify-center"
      style={{ width: size, height: size }}
    >
      <span
        className="material-icons material-icons-outlined"
        style={{ fontSize: size }}
      >
        {name}
      </span>
    </span>
  );
}

Icon.propTypes = {
  name: P.string,
  size: P.number,
};

Icon.defaultProps = {};
