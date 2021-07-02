// import { SyntheticEvent } from 'react';

declare namespace Data {
  export interface Point {
    x: number;
    y: number;
  }

  export interface Size {
    width: number;
    height: number;
  }

  export interface CanvasObject {
    id: string;
    pos: Point;
    size: Size;
    locked: boolean;
    disabled: boolean;
    entity: string;
  }

  export interface GameEntityObject {
    id: string;
    tier: -1 | 1 | 2 | 3 | 4;
    powerType: 'constant' | 'solar' | 'wind' | 'toggle';
    power: number;
  }

  export interface NormalizedGameEntityObject extends GameEntityObject {
    size: Size;
  }

  export interface PopulatedCanvasObject extends CanvasObject {
    entity: NormalizedGameEntityObject;
  }

  export type Difficulty = 'easy' | 'medium' | 'hard' | 'veryHard';

  export type Efficiency = 0.25 | 0.5 | 1 | 1.5 | 1.75;

  export interface Location {
    id: string;
    difficulty: Difficulty;
    wind: Efficiency;
    solar: Efficiency;
  }
}

declare namespace Callback {
  export namespace Entity {
    export interface AddNew {
      (o: Data.GameEntityObject): void;
    }
  }
  export namespace Drag {
    export interface OnExternalDrag {
      (o: Data.GameEntityObject): void;
    }
  }
}

declare namespace State {
  export namespace Hooks {
    export interface UseAppSettingsHook {
      grid: {
        size: Data.Size;
      };
      guideLayer: {
        visible: boolean;
      };
    }
  }
}

declare namespace Hooks {
  export namespace App {
    export interface UseAppStateHook {
      flags: {
        menuVisible: boolean;
      };
      actions: {
        toggleMenu(): void;
      };
    }
  }

  export namespace Canvas {
    export type CurrentlyAdding = null | {
      entity: Data.NormalizedGameEntityObject;
    };

    export type CurrentlyDragging = null | {};

    export type CurrentlyAddingExternal = null | {};

    export interface CanvasStateFlags {
      isAddingNew: boolean;
      isAddingExternal: boolean;
      isDragging: boolean;
    }

    export interface UseCanvasStateHook {
      adding: CurrentlyAdding;
      drag: CurrentlyDragging;
      external: CurrentlyAddingExternal;
      flags: CanvasStateFlags;
    }
  }

  export namespace Objects {
    export interface UseCanvasObjectsHook {
      ids: string[];
      entities: Record<string, Data.CanvasObject>;
    }
  }

  export namespace GameEntities {
    export interface UseGameEntitiesHook {
      ids: string[];
      entities: Record<string, Data.GameEntityObject>;
    }
  }

  export namespace Locations {
    export interface UseGameLocationsHook {
      ids: string[];
      entities: Record<string, Data.Location>;
      current: string;
      actions: {
        setCurrent(id: string): void;
      };
    }
  }

  export namespace Derived {
    export interface UseNormalizedGameObjectsHook {
      ids: string[];
      entities: Record<string, Data.NormalizedGameEntityObject>;
    }

    export interface UseCanvasGameObjectsOptions {
      useEntitySize?: boolean;
    }

    export interface UseCanvasGameObjectsHook {
      ids: string[];
      entities: Record<string, Data.PopulatedCanvasObject>;
    }

    export interface UsePowerEfficiencyHook {
      power: {
        producers: Record<string, Data.PopulatedCanvasObject>;
        consumers: Record<string, Data.PopulatedCanvasObject>;
      };
      sum: {
        producers: number;
        consumers: number;
      };
    }

    export interface UseUsageThingsHook {
      ids: string[];
      entities: Record<string, Data.PopulatedCanvasObject>;
    }

    export interface UsePowerBreakdownHook {
      sum: {
        production: number;
        usage: number;
      };
      breakdown: {
        [k: 'onDemand' | 'solar' | 'wind' | 'powered' | 'constant']: {
          raw: number;
          adjusted: number;
        };
      };
    }
  }
}
