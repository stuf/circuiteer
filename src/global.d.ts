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

// declare interface IModuleObject {
//   id: string;

//   shortId: string;

//   name: string;

//   tier: IModuleTier;

//   /**
//    * Power consumption/production units/sec
//    * Positive values for production, negative for consumption
//    */
//   power: number;
// }

// declare interface IModuleDict {
//   [k: string]: IModuleObject;
// }

// declare type IEntityType = 'platform' | 'module' | 'attachment';

// declare interface IEntityObject {
//   id: string;
//   type: IEntityType;
//   pos: [number, number];
//   size: [number, number];
//   attachments: IEntityObject;
// }

// //

// declare interface IState {
//   canvas: {
//     grid: [number, number];
//     drag: {
//       dragging: boolean;
//       pos: [number, number];
//       size: [number, number];
//     };
//     mouse: {
//       pos: [number, number];
//     };
//   };
//   entities: IEntityObject[];
//   modules: IModuleDict;
// }

// declare interface IContextState {
//   state: IState;
//   setState: React.Dispatch<React.SetStateAction<IState>>;
// }

// //

// declare type TMatrix<T = number> = T[][];

// declare class Matrix {
//   constructor(ps: TMatrix);

//   rows: number;
//   cols: number;
//   data: TMatrix;

//   mulEach(n: number): Matrix;
//   mulEach_(n: number): void;

//   getSum(): number;

//   // cloning
//   clone(): Matrix;
//   toArray(): TMatrix;
// }

// declare class Vector {}
