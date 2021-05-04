import * as L from 'partial.lenses';
import { createAction, createReducer } from '@reduxjs/toolkit';
import { v4 as uuid } from 'uuid';

export const addEntity = createAction('addEntity', entity => ({
  payload: L.set('id', uuid(), entity),
}));

//

const init = () => ({
  entities: [],
});

const reducer = createReducer(init(), {
  [addEntity]: (s, a) => {
    // get rid of this shit
    s.entities = [...s.entities, a.payload];
  },
});

export default reducer;

//

/**
 * @typedef {object} Entity
 * @prop {object} module
 * @prop {string} id
 * @prop {[number, number]} pos
 */
