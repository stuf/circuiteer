import cx from 'classnames';

import WindTurbine from 'assets/icons/Icon_Wind_Turbine.png';
import SolarPanel from 'assets/icons/Icon_Solar.png';
import Generator from 'assets/icons/Icon_Generator.png';
import IconTierSmall from 'assets/icons/Icon_Tier_Small.png';
import IconTierMedium from 'assets/icons/Icon_Tier_Medium.png';
import IconTierLarge from 'assets/icons/Icon_Tier_Large.png';
import IconTierExtraLarge from 'assets/icons/Icon_Tier_Extra_Large.png';

/**
 * @type {{ [k: string]: Game.IGameIcon }}
 */
const icon = {
  tierSmall: {
    src: IconTierSmall,
    alt: 'Tier Small',
  },
  tierMedium: {
    src: IconTierMedium,
    alt: 'Tier Medium',
  },
  tierLarge: {
    src: IconTierLarge,
    alt: 'Tier Large',
  },
  tierExtraLarge: {
    src: IconTierExtraLarge,
    alt: 'Tier Extra Large',
  },
};

/**
 * @type {{ [k: keyof PowerType]: string }}
 */
const type = {
  wind: WindTurbine,
  sun: SolarPanel,
  always: Generator,
};

const alt = {
  wind: 'Wind Turbine',
  sun: 'Solar Panel',
  always: 'Generator',
};

export function GameIcon(props) {
  const { name, ...rest } = props;

  return (
    <>
      <img src={type[name]} alt={alt[name]} {...rest} />
    </>
  );
}

//

/**
 *
 * @param {string} name
 * @returns
 */
const mkIcon = name => {
  const iconObj = icon[name];

  if (!iconObj) {
    return null;
  }

  const { src, alt } = iconObj;

  const Icon = ({ className, ...props }) => (
    <>
      <img
        {...props}
        {...{
          src,
          alt,
          className: cx('game-icon', `game-icon--${name}`, className),
        }}
      />
    </>
  );

  Icon.displayName = `Icon(${name})`;

  return Icon;
};

export const TierSmall = mkIcon('tierSmall');
export const TierMedium = mkIcon('tierMedium');
export const TierLarge = mkIcon('tierLarge');
export const TierExtraLarge = mkIcon('tierExtraLarge');

//

export const TierIcon = ({ tier, className }) => {
  const props = { className };

  switch (tier) {
    case 1:
      return <TierSmall {...props} />;
    case 2:
      return <TierMedium {...props} />;
    case 3:
      return <TierLarge {...props} />;
    case 4:
      return <TierExtraLarge {...props} />;
    default:
      return null;
  }
};
