export enum MaterialType {
  NATURAL = 'natural',
  REFINED = 'refined',
  COMPOSITE = 'composite',
  ATMOSPHERIC = 'atmospheric',
  OTHER = 'other',
}

export class Material {
  constructor(
    public id: string,
    public name: string,
    public type: MaterialType,
  ) {
    this.id = id;
    this.name = name;
    this.type = type;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      type: this.type,
    };
  }
}

export class NaturalMaterial extends Material {
  constructor(id: string, name: string) {
    super(id, name, MaterialType.NATURAL);
  }
}

export class RefinedMaterial extends Material {
  constructor(id: string, name: string) {
    super(id, name, MaterialType.REFINED);
  }
}

export class CompositeMaterial extends Material {
  constructor(id: string, name: string) {
    super(id, name, MaterialType.COMPOSITE);
  }
}

export class AtmosphericMaterial extends Material {
  constructor(id: string, name: string) {
    super(id, name, MaterialType.ATMOSPHERIC);
  }
}

export class OtherMaterial extends Material {
  constructor(id: string, name: string) {
    super(id, name, MaterialType.OTHER);
  }
}
