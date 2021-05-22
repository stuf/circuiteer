interface IModule {
  id: string;
  shortId: string;
  tier: number;
  power: number;
  powerType?: string;
  capacity?: number;
  size: Point;
  recipe: { [k: string]: number };
}

export class Module {
  constructor(private obj: IModule) {}

  toObject() {
    return this.obj;
  }

  toJSON() {
    return this.toObject();
  }
}
