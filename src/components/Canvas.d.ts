declare interface ICanvasProps {
  objects: IObject[];
  options?: Partial<ICanvasOptions>;

  width?: number;
  height?: number;
  parentWidth?: number;
  parentHeight?: number;
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

  width: number;
  height: number;
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

  /**
   * Callback when an object has been dragged on the canvas
   * and dropped
   */
  onDragStop?: (e: MouseEvent) => void;

  /**
   * Callback when something is being dragged to the canvas
   * from outside of it
   */
  onDragOver?: (e: DragEvent) => void;
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
