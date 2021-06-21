declare interface ICanvasProps {
  options?: Partial<ICanvasOptions>;
}

declare interface ICanvasState {
  options: ICanvasOptions;

  drag: null | {
    /**
     * Identifier for the currently dragged object
     */
    current: string;
    /**
     * Point where this drag event started from
     */
    origin: IPoint;
    /**
     * Point where current object is positioned
     */
    pos: IPoint;
    /**
     * Pythagorean distance between origin and current position
     */
    distance: number;
    size: ISize;
    moved: boolean;
  };

  objects: IObject[];
}

//

declare interface ICanvasOptions {
  /**
   * The minimum distance that an element should be dragged from
   * to being considered as being dragged
   */
  minimumDragDistance: number;

  onDragStart?: (e: MouseEvent) => void;

  onDragMove?: (e: MouseEvent) => void;

  onDragStop?: (e: MouseEvent) => void;
}

//

declare interface IObject<Id = string> {
  id: Id;
  pos: IPoint;
  size: ISize;
}

declare interface IPoint {
  x: number;
  y: number;
}

declare interface ISize {
  width: number;
  height: number;
}
