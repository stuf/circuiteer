import { stringRepr } from 'common/meta';

export enum Difficulty {
  EASY,
  MEDIUM,
  HARD,
  VERY_HARD,
}

export enum PowerEfficiency {
  VERY_LOW = 0.25,
  LOW = 0.5,
  MEDIUM = 1,
  HIGH = 1.5,
  VERY_HIGH = 1.75,
}

export interface IPowerStrength {
  solar: PowerEfficiency;
  wind: PowerEfficiency;
}

export interface ILocation {
  id: LocationId;
  difficulty: Difficulty;
  power: IPowerStrength;
  cycle: number | [number, number];
}

export type LocationId =
  | 'sylva'
  | 'desolo'
  | 'calidor'
  | 'vesania'
  | 'novus'
  | 'glacio'
  | 'atrox';

export class Location implements ILocation {
  id: LocationId;
  difficulty: Difficulty;
  power: IPowerStrength;
  cycle: number | [number, number];

  constructor(obj: ILocation) {
    this.id = obj.id as LocationId;
    this.difficulty = obj.difficulty;
    this.power = obj.power;
    this.cycle = obj.cycle;
  }

  toObject() {
    return {
      id: this.id,
      difficulty: this.difficulty,
      power: this.power,
      cycle: this.cycle,
    };
  }

  toJSON() {
    return this.toObject();
  }

  toString() {
    return stringRepr('Location', this.toObject());
  }
}

export const mkLocation = (obj: ILocation) => new Location(obj);
