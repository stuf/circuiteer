import * as L from 'partial.lenses';
import * as V from 'partial.lenses.validation';
import {
  isBoolean,
  isNonEmpty,
  isNumber,
  isObject,
  isPosition,
  isString,
} from './validation';

export const nonEmpty = [isNonEmpty, 'required'];

export const string = [isString, 'requires a string'];

export const number = [isNumber, 'requires a number'];

export const position = [isPosition, 'requires a position tuple'];

export const boolean = [isBoolean, 'requires a boolean'];

export const object = [isObject, 'requires an object'];

// Specialized

export const moduleId = [isString, 'requires a module ID'];

//

const baseEntity = V.props({
  id: V.optional(string),
  pos: position,
  enabled: V.and(nonEmpty, boolean),
  module: V.and(moduleId),
});

const smallEntity = V.props({
  tier: V.and(nonEmpty, number),
});

export const entities = {
  baseEntity,
  smallEntity,
};
