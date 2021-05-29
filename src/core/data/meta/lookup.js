import { merge } from 'ramda';
import * as mods from 'core/data/modules';

export const lookup = {
  module: Object.values(mods)
    .flat()
    .reduce((o, mod) => merge(o, { [mod.id]: mod }), {}),
};
