import * as R from 'ramda';
import { inspect } from 'util';
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import * as reducer from 'state';

//

export const replayState = (state, reducer, actions, options = {}) => {
  const collectResults = options?.collectResults;

  const reducerFn = collectResults ? R.scan : R.reduce;

  // const stateʼ= reducerFn((s, a ))
  const stateʼ = reducerFn(reducer, state, actions);

  return stateʼ;
};

export const show = x =>
  console.log(inspect(x, { colors: true, depth: Infinity }));

//

export function wrapper(props, preloadedState) {
  const store = configureStore({ preloadedState, reducer });

  return <Provider store={store}>{props.children}</Provider>;
}
