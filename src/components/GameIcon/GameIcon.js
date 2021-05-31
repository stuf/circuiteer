import cx from 'classnames';
import * as P from 'prop-types';
import * as icons from './icons';
import { synonyms } from './lookup';

import './GameIcon.css';

export function GameIcon(props) {
  const { name, className } = props;

  const inSynonyms = name in synonyms;

  let iconName = name;

  if (inSynonyms) {
    iconName = synonyms[name];
  }

  const icon = icons[iconName];

  return (
    <>
      <img
        src={icon?.src}
        alt={icon?.id}
        className={cx('game-icon', className)}
      />
    </>
  );
}

GameIcon.propTypes = {
  tier: P.bool,
  /**
   * FIXME This is a bad validator
   */
  name: (props, k, c) => {
    const i = icons[props[k]];

    if (!i && !props.tier) {
      const p = props[k];

      const err = [
        `Invalid prop \`${k}\` supplied to component \`${c}\`.`,
        `Icon \`${p}\` not found.`,
        `Available icons: ${Object.keys(icons).join(', ')}`,
      ];
      return new Error(err.join('\n\n'));
    }
  },
};

GameIcon.defaultProps = {
  tier: false,
};
