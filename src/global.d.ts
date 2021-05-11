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

  tier: IModuleTier;

  /**
   * Power consumption/production units/sec
   * Positive values for production, negative for consumption
   */
  power: number;

  powerType?: ValueOf<IPowerType>;

  capacity?: number;

  size: Point;
}

type Tuple<A, B> = [A, B];

type Point = Tuple<number, number>;

type ValueOf<T> = T[keyof T];

declare interface IPowerStrength {
  VERY_LOW: 0.25;
  LOW: 0.5;
  MEDIUM: 1;
  HIGH: 1.5;
  VERY_HIGH: 1.75;
}

declare interface IPowerType {
  ALWAYS: 'always';
  POWERED: 'powered';
  WIND: 'wind';
  SUN: 'sun';
}

declare interface IDifficulty {
  EASY: 'easy';
  MEDIUM: 'medium';
  HARD: 'hard';
  VERY_HARD: 'very_hard';
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

declare namespace App {
  declare namespace State {
    declare interface Drag {
      dragging: boolean;
      pos: Point;
      size: Tuple<number, number>;
    }

    declare interface Editor {}

    declare interface Grid {
      size: Tuple<number, number>;
    }

    declare interface Location {
      locations: Game.ILocation[];
      current: string;
    }

    declare interface Options {
      flags: {
        hideInvalid: boolean;
        showPowerStatus: boolean;
        showEditor: boolean;
        showShoppingList: boolean;
      };
    }
  }

  declare interface Store {
    drag: State.Drag;
    editor: State.Editor;
    grid: State.Grid;
    location: State.Location;
    options: State.Options;
  }
}

declare namespace Game {
  declare interface ILocation {
    id: string;

    name: string;

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
    cycle: number | [number, number];
  }

  declare interface IGameIcon {
    src: string;
    alt: string;
  }
}
