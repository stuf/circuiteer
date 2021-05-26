import * as R from 'ramda';
import * as V from 'partial.lenses.validation';

import * as mods from '../index';

const nonEmpty = R.identity;
const isNumber = R.is(Number);
const isTuple = R.both(R.is(Array), R.all(isNumber));
const isObject = R.is(Object);
const isValidRecipe = R.either(R.equals(null), isObject);

const required = [nonEmpty, 'required'];
const number = [isNumber, 'required number'];
const tuple = [isTuple, 'required tuple'];
const object = [isObject, 'required object'];
const validRecipe = [
  isValidRecipe,
  'requires valid recipe (either null or object)',
];

const validationRule = V.propsOr(V.accept, {
  id: required,
  tier: V.and(required, number),
  size: V.and(required, tuple),
  recipe: validRecipe,
});

describe('modules', () => {
  Object.entries(mods).forEach(([key, modules]) => {
    describe(`${key}`, () => {
      modules.forEach(mod => {
        test(`${mod.id}`, () => {
          expect(V.errors(validationRule, mod)).toBeUndefined();
        });
      });
    });
  });
});
