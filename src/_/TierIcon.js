import * as P from 'prop-types';

import Tier1 from 'assets/icons/Icon_Tier_Small.png';
import Tier2 from 'assets/icons/Icon_Tier_Medium.png';
import Tier3 from 'assets/icons/Icon_Tier_Large.png';
import Tier4 from 'assets/icons/Icon_Tier_Extra_Large.png';

const tiers = [null, Tier1, Tier2, Tier3, Tier4];

export default function TierIcon(props) {
  const { tier, style, className } = props;

  let tierIcon;
  switch (tier) {
    case 0:
      return <></>;
    default:
      tierIcon = (
        <img {...{ style, className }} src={tiers[tier]} alt={`Tier ${tier}`} />
      );
  }

  return <>{tierIcon}</>;
}

TierIcon.propTypes = {
  tier: P.number.isRequired,
};

export function TierIconSvg(props) {
  const { tier, style, className } = props;

  let tierIcon;
  switch (tier) {
    case 0:
      return <></>;
    default:
      const href = tiers[tier];
      tierIcon = <image {...{ className, style, href }} />;
  }

  return <>{tierIcon}</>;
}

TierIconSvg.propTypes = {
  tier: P.number.isRequired,
};
