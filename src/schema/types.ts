export type Tuple<A, B> = [A, B];

/**
 * A number pair type for defining a coordinate point
 */
export type Point = Tuple<number, number>;

/**
 * A number pair type for defining an object's dimensions
 */
export type Size = Tuple<number, number>;

export type ValueOf<T> = T[keyof T];

export interface IPowerType {
  /**
   * Power production is constant
   */
  ALWAYS: 'always';

  /**
   * Power production is togglable (e.g. generator)
   */
  POWERED: 'powered';

  /**
   * Power production depends on wind
   */
  WIND: 'wind';

  /**
   * Power production depends on the sun
   */
  SUN: 'sun';
}

export enum IModuleTier {
  /**
   * Tier that does not belong to any other tier,
   * used for special thing such as wrecked solar arrays.
   */
  OTHER = -1,
  SMALL = 1,
  MEDIUM = 2,
  LARGE = 3,
  XLARGE = 4,
}

export interface IModule {
  /**
   * Internal ID for this module
   */
  id: string;

  /**
   * Short ID string
   */
  shortId: string;

  /**
   * Module size tier
   */
  tier: IModuleTier;

  /**
   * Power consumption/production units/sec
   * Positive values for production, negative for consumption
   */
  power: number;

  /**
   * The "kind" of power this module produces
   */
  powerType?: ValueOf<IPowerType>;

  /**
   * If the module can keep a charge, define how many units of
   * power it can store.
   */
  capacity?: number;

  /**
   * The module's size on the grid
   */
  size: Point;
}
