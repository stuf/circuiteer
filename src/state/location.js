import * as L from 'partial.lenses';

import { createAction, createReducer, original } from '@reduxjs/toolkit';

export const changeLocation = createAction('changeLocation');

//

const reducer = createReducer(
  {
    locations: [{ id: 1, name: 'firstPlanet', displayName: 'First Planet' }],
    current: 1,
  },
  {
    [changeLocation]: (s, a) => L.set(['current'], a.payload, original(s)),
  },
);

export default reducer;

//

/**
 * @typedef {object} Location
 * @prop {number} id
 * @prop {string} name
 * @prop {string} displayName
 */
