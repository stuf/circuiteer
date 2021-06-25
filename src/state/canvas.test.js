import reducer, { addingNew, dragStart, dragStop } from './canvas';

test('dragStart', () => {
  const a = dragStart({ id: '123', pos: { x: 12, y: 12 } });
  const r = reducer({}, a);
  const e = { drag: '123', move: { id: '123', from: { x: 12, y: 12 } } };

  expect(r).toEqual(e);
});

test('dragStop', () => {
  const a = dragStop({ id: '123', pos: { x: 23, y: 23 } });
  const r = reducer({}, a);
  const e = { drag: null, move: { id: '123', to: { x: 23, y: 23 } } };

  expect(r).toEqual(e);
});

test('addingNew', () => {
  const a = addingNew({ id: 'rtg', size: { width: 100, height: 100 } });
  const r = reducer({}, a);
  const e = {
    adding: { entity: { id: 'rtg', size: { width: 100, height: 100 } } },
  };

  expect(r).toEqual(e);
});
