declare interface IBaseEntityCtor {}

declare interface IEntity {
  id: string;
  module: IModule;
  pos: Point;
  enabled: boolean;
}

declare interface IModule {
  id: string;

  shortId: string;

  name: string;

  tier: IModuleTier;

  /**
   * Power consumption/production units/sec
   * Positive values for production, negative for consumption
   */
  power: number;

  powerType?: ValueOf<IPowerType>;

  size: Point;
}

type Tuple<A, B> = [A, B];

type Point = Tuple<number, number>;

type ValueOf<T> = T[keyof T];

declare interface IPowerType {
  ALWAYS: 'always';
  POWERED: 'powered';
  WIND: 'wind';
  SUN: 'sun';
}

declare enum IModuleTier {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
  XLARGE = 4,
}

//

declare interface IBaseMaterial {
  id: string;
  displayName: string;
}
