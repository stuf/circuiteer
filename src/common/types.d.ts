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
    enabled: boolean;
  }
}
