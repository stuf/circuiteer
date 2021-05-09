import * as I from 'infestines';
import * as L from 'partial.lenses';

export function BaseMaterial(object) {
  if (!I.isInstanceOfU(BaseMaterial, this)) return new BaseMaterial(object);

  this._object = Object.assign({}, object);
}

//

export const NaturalMaterial = I.inherit(function NaturalMaterial(object) {
  if (!I.isInstanceOfU(NaturalMaterial, this))
    return new NaturalMaterial(object);

  BaseMaterial.call(this);
}, BaseMaterial);

//

export const RefinedMaterial = I.inherit(function RefinedMaterial(object) {
  if (!I.isInstanceOfU(RefinedMaterial, this))
    return new RefinedMaterial(object);

  BaseMaterial.call(this);
}, BaseMaterial);

//

export const CompositeMaterial = I.inherit(function CompositeMaterial(object) {
  if (!I.isInstanceOfU(CompositeMaterial, this))
    return new CompositeMaterial(object);

  BaseMaterial.call(this);
}, BaseMaterial);

//

export const AtmosphericMaterial = I.inherit(function AtmosphericMaterial(
  object,
) {
  if (!I.isInstanceOfU(AtmosphericMaterial, this))
    return new AtmosphericMaterial(object);

  BaseMaterial.call(this);
},
BaseMaterial);
