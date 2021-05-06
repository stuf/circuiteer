declare interface IBaseEntityCtor {}

declare interface IEntity {
  id: string;
  module: IModule;
  pos: [number, number];
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

  size: [number, number];
}

declare enum IModuleTier {
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
  XLARGE = 4,
}
