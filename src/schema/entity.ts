import { Point } from './types';

export interface IEntityObject {
  id: string;
  module: string;
  pos: Point;
  enabled: boolean;
}

export class Entity {
  id: string;
  module: string;
  pos: Point;
  enabled: boolean;

  constructor(obj: IEntityObject) {
    this.id = obj.id;
    this.module = obj.module;
    this.pos = obj.pos;
    this.enabled = obj.enabled;
  }
}
