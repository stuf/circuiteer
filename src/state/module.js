import * as L from 'partial.lenses';
import { createReducer } from '@reduxjs/toolkit';

import { modules } from '../config';

const init = () => ({
  tier: Object.entries(modules).reduce(
    (o, [k, module]) => L.set([`${module.tier}`, L.appendTo], module, o),
    {},
  ),
});

//

const reducer = createReducer(init(), {});

export default reducer;
