export interface IIconObjectFFI {
  id: string;
  src: string;
}

export class IconObject {
  id: string;
  src: string;

  constructor(id: string, src: string) {
    this.id = id;
    this.src = src;
  }

  // FFI

  toJSON() {
    return {
      id: this.id,
      src: this.src,
    };
  }

  static fromJSON(data: IIconObjectFFI) {
    return new IconObject(data.id, data.src);
  }
}
