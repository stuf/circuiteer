declare interface IBaseEntityCtor {}

declare type EntityID = string;

declare interface IEntity {
  id: EntityID;
  module: string;
  pos: Point;
  enabled: boolean;
}

declare interface IPopulatedEntity extends IEntity {
  module: IModule;
}

declare interface IModule {
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

  recipe: { [k: string]: number };
}

declare interface ITranslatedModule extends IModule {
  displayName: string;
}

declare type ModuleDict = { [k: string]: IModule };

declare type Tuple<A, B> = [A, B];

/**
 * A number pair type for defining a coordinate point
 */
declare type Point = Tuple<number, number>;

/**
 * A number pair type for defining an object's dimensions
 */
declare type Size = Tuple<number, number>;

declare type ValueOf<T> = T[keyof T];

declare interface IPowerType {
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

declare enum IModuleTier {
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

//

declare interface IBaseMaterial {
  id: string;
  displayName: string;
}

/**
 * Definitions relating to the application itself
 */
declare namespace App {
  declare namespace Data {
    declare interface Module extends IModule {}

    declare interface SmallModule extends Module {
      tier: IModuleTier.SMALL;
    }

    declare interface MediumModule extends Module {
      tier: IModuleTier.MEDIUM;
    }
  }
  declare namespace UI {
    declare type OptionList = App.Internal.IOption[];
  }

  declare namespace Internal {
    declare interface IOption {
      label: string;
      value: (v: any) => any;
      action: () => any;
    }
  }

  declare namespace State {
    declare interface Application {
      /**
       * Should we show the application splash screen on initial
       * visit.
       */
      splash: {
        delay: number;
        show: boolean;
      };
    }

    declare interface Drag {
      dragging: boolean;
      pos: Point;
      size: Size;
    }

    declare interface Editor {
      dragging: boolean;
      current?: EntityID;
      entities: IEntity[];
    }

    declare interface Grid {
      size: Size;
    }

    declare interface Location {
      locations: Game.ILocation[];
      current?: string;
    }

    declare interface Options {
      flags: Partial<{
        hideInvalid: boolean;
        showPowerStatus: boolean;
        showEditor: boolean;
        showShoppingList: boolean;
        showEfficiencyAsMultiplier: boolean;
      }>;
    }
  }

  declare interface Store {
    application: State.Application;
    drag: State.Drag;
    editor: State.Editor;
    grid: State.Grid;
    location: State.Location;
    options: State.Options;
  }
}

/**
 * Definitions relating to game mechanics
 */
declare namespace Game {
  declare namespace Material {
    declare interface BaseMaterial {}

    declare interface NaturalMaterial extends BaseMaterial {}
    declare interface RefinedMaterial extends BaseMaterial {}
    declare interface CompositeMaterial extends BaseMaterial {}
    declare interface AtmosphericMaterial extends BaseMaterial {}
    declare interface OtherMaterial extends BaseMaterial {}
  }

  /**
   * A location's power generation strength
   */
  declare interface IPowerStrength {
    VERY_LOW: 0.25;
    LOW: 0.5;
    MEDIUM: 1;
    HIGH: 1.5;
    VERY_HIGH: 1.75;
  }

  declare interface IPlanetType {
    TERRAN: 'terran';
    TERRAN_MOON: 'terranMoon';
    ARID: 'arid';
    EXOTIC: 'exotic';
    EXOTIC_MOON: 'exoticMoon';
    TUNDRA: 'tundra';
    RADIATED: 'radiated';
  }

  declare type PlanetType = ValueOf<IPlanetType>;

  declare interface IDifficulty {
    EASY: 'easy';
    MEDIUM: 'medium';
    HARD: 'hard';
    VERY_HARD: 'veryHard';
  }

  declare type Difficulty = ValueOf<IDifficulty>;

  declare interface ILocation {
    id: string;

    name?: string;

    type?: ValueOf<IPlanetType>;

    difficulty: ValueOf<IDifficulty>;

    /**
     * Wind strength
     */
    wind: ValueOf<IPowerStrength>;

    /**
     * Sun strength
     */
    sun: ValueOf<IPowerStrength>;

    /**
     * Day/night cycle length in seconds, either as a single value
     * or a tuple of duration and margin of error.
     */
    cycle?: number | [number, number];
  }

  declare interface IGameIcon {
    src: string;
    alt: string;
  }
}
