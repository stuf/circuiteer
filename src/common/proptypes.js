import * as P from 'prop-types';

export const ModuleObj = P.shape({
  id: P.string,
  shortId: P.string,
  displayName: P.string,
  power: P.number,
  size: P.arrayOf(P.number),
});

export const EntityObj = P.shape({
  id: P.string,
  enabled: P.bool,
  module: ModuleObj,
});
