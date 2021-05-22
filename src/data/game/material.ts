import { stringRepr } from 'common/meta';
import { ILocation } from './location';

export enum MaterialType {
  NATURAL,
  REFINED,
  COMPOSITE,
  ATMOSPHERIC,
  OTHER,
}

export interface IBaseMaterial {
  type: MaterialType;
  id: string;
  name?: string;
  location?: ILocation[];
}

export class BaseMaterial implements IBaseMaterial {
  typeName = 'BaseMaterial';
  type: MaterialType;
  id: string;
  name?: string;
  location?: ILocation[];

  constructor(obj: IBaseMaterial) {
    this.type = obj.type;
    this.id = obj.id;
    this.name = obj.name;
    this.location = obj.location;
  }

  toObject() {
    return {
      type: this.type,
      id: this.id,
      name: this.name,
      location: this.location,
    };
  }

  toJSON() {
    return this.toObject();
  }

  toString() {
    return stringRepr(this.typeName, this.toObject());
  }
}

export const mkBaseMaterial = (obj: IBaseMaterial) => new BaseMaterial(obj);
