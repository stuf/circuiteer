import * as R from 'ramda';

export const isNonEmpty = x => !!x;
export const isString = R.is(String);
export const isNumber = R.is(Number);
export const isArray = R.is(Array);
export const isBoolean = R.is(Boolean);
export const isPosition = R.both(isArray, R.pipe(R.length, R.equals(2)));
export const isObject = R.is(Object);
