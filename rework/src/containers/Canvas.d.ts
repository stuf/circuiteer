import { FunctionComponent } from 'react';

export interface CanvasOptions {
  minimumDragDistance: number;
  onDragStart: Function;
  onDragMove: Function;
  onDragStop: Function;
}

export interface Props {
  objects: Data.PopulatedCanvasObject[];
  options: Partial<CanvasOptions>;
  flags: Hooks.Canvas.CanvasStateFlags;
  currentlyAdding: null | Data.NormalizedGameEntityObject;
}

export interface AutosizeProps extends Props {
  parentWidth: number;
  parentHeight: number;
}

export type CanvasContainer = FunctionComponent<Props>;

export const AutosizeCanvas: FunctionComponent<AutosizeProps>;
