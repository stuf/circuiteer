import { Point } from '../types';

interface IModule {
  id: string;
  shortId: string;
  tier: number;
  power: number;
  powerType?: string;
  capacity?: number;
  size: Point;
  recipe: { [k: string]: number };
}

type ModuleKeys = keyof IModule;

export class Module {
  id: string;
  shortId: string;
  tier: number;
  power: number;
  powerType?: string;
  capacity?: number;
  size: Point;
  recipe: { [k: string]: number };

  constructor(obj: IModule) {
    this.id = obj.id;
    this.shortId = obj.id;
    this.tier = obj.tier;
    this.power = obj.power;
    this.powerType = obj.powerType;
    this.capacity = obj.capacity;
    this.size = obj.size;
    this.recipe = obj.recipe;
  }

  toObject(): IModule {
    return {
      id: this.id,
      shortId: this.shortId,
      tier: this.tier,
      power: this.power,
      powerType: this.powerType,
      capacity: this.capacity,
      size: this.size,
      recipe: this.recipe,
    };
  }

  toJSON() {
    return this.toObject();
  }
}
