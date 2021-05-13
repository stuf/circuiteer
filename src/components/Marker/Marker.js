import * as P from 'prop-types';

import './Marker.css';

/**
 * @param {Props} props
 * @returns
 */
export function Marker(props) {
  const { text, pattern, highlight } = props;

  if (!highlight || !pattern) {
    return (
      <span
        data-testid="no-highlight-or-pattern"
        className="marker marker--no-highlight-or-pattern"
      >
        {text}
      </span>
    );
  }

  const res = pattern.exec(text);
  if (!res) {
    return (
      <span data-testid="no-match" className="marker marker--no-match">
        {text}
      </span>
    );
  }

  const match = res[0];
  const len = match.length;
  const ix = res.index;

  const left = text.slice(0, ix);
  const mid = text.slice(ix, ix + len);
  const right = text.slice(ix + len);

  return (
    <>
      <span className="marker marker--root" data-testid="found-match">
        <span className="marker__match" data-testid="left">
          {left}
        </span>
        <mark className="marker__match-highlight" data-testid="mid">
          {mid}
        </mark>
        <span className="marker__match" data-testid="right">
          {right}
        </span>
      </span>
    </>
  );
}

Marker.propTypes = {
  text: P.string,
  pattern: P.instanceOf(RegExp),
  highlight: P.bool,
};

/**
 * @typedef {object} Props
 * @prop {string} text
 * @prop {?RegExp} [pattern]
 * @prop {?boolean} [highlight]
 */
