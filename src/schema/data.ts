export class IconObject {
  id: string;
  src: string;

  constructor(id: string, src: string, data: any) {
    this.id = id;
    this.src = src;
  }

  toJSON() {
    return {
      id: this.id,
      src: this.src,
    };
  }
}
