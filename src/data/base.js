import * as I from 'infestines';
import * as L from 'partial.lenses';
import * as V from 'partial.lenses.validation';
import { v4 as uuid } from 'uuid';

import { entities } from './rules';
import './typedefs';

const validateByDefault = true;

const Tier = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 4,
  XLARGE: 8,
};

//

/**
 * @interface
 * @param {IBaseEntity} object
 * @returns
 */
export function BaseEntity(object) {
  if (!I.isInstanceOfU(BaseEntity, this)) return new BaseEntity(object);

  const _object = L.transform(
    L.seq(['id', L.orElse(L.setOp(uuid()), [])]),
    object,
  );

  this._validation = entities.baseEntity;
  this._object = _object;
}

BaseEntity.prototype.toJSON = function BaseEntity$toJSON() {
  const o = this._object;
  return o;
};

//

/**
 * @type {(object: IBaseEntity) => BaseEntity}
 */
export const SmallEntity = I.inherit(function SmallEntity(object) {
  if (!I.isInstanceOfU(SmallEntity, this)) return new SmallEntity(object);

  BaseEntity.call(this);

  this._object = L.set('tier', Tier.SMALL, this._object);
}, BaseEntity);

//

/**
 * @type {(object: IBaseEntity) => BaseEntity}
 */
export const MediumEntity = I.inherit(function MediumEntity(object) {
  if (!I.isInstanceOfU(MediumEntity, this)) return new MediumEntity(object);

  BaseEntity.call(this);

  this._object = L.set('tier', Tier.MEDIUM, this._object);
}, BaseEntity);

//

/**
 * @type {(object: IBaseEntity) => BaseEntity}
 */
export const LargeEntity = I.inherit(function LargeEntity(object) {
  if (!I.isInstanceOfU(LargeEntity, this)) return new LargeEntity(object);

  BaseEntity.call(this);

  this._object = L.set('tier', Tier.LARGE, this._object);
}, BaseEntity);

//

/**
 * @type {(object: IBaseEntity) => BaseEntity}
 */
export const XLargeEntity = I.inherit(function XLargeEntity(object) {
  if (!I.isInstanceOfU(XLargeEntity, this)) return new XLargeEntity(object);

  BaseEntity.call(this);

  this._object = L.set('tier', Tier.XLARGE, this._object);
}, BaseEntity);
