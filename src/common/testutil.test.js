import * as L from 'partial.lenses';
import { replayState, show } from './testutil';

describe('replayState', () => {
  let reducerFn;
  let actions;

  beforeEach(() => {
    reducerFn = (s, a) => {
      switch (a.type) {
        case 'foo':
          return L.set('foo', true, s);
        case 'toggleFoo':
          return L.modify('foo', x => !x, s);
        case 'setFoo':
          return L.set('foo', a.payload, s);
        case 'ofFoo':
          return L.modify('foo', x => [x], s);
        default:
          return s;
      }
    };

    actions = [
      { type: 'foo', payload: {} },
      { type: 'toggleFoo' },
      { type: 'setFoo', payload: 123 },
      { type: 'ofFoo' },
    ];
  });

  test('collectResults = true', () => {
    const stateResult = replayState({}, reducerFn, actions, {
      collectResults: true,
    });

    // The collected results should be initial state +
    // actions' subsequent states
    expect(stateResult).toHaveLength(actions.length + 1);
  });

  test('collectResults = false', () => {
    const stateResult = replayState({}, reducerFn, actions);

    expect(Array.isArray(stateResult)).toBe(false);
  });
});

test('show', () => {
  const log = console.log;
  console.log = () => {};
  show('poopoo');
  console.log = log;
});
