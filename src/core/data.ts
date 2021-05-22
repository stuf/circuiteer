import { BaseMaterial, IBaseMaterial, MaterialType } from 'data/game/material';

const naturals: Record<string, IBaseMaterial> = (type => ({
  soil: { id: 'soil', type },
  organic: { id: 'organic', type },
  compound: { id: 'compound', type },
  resin: { id: 'resin', type },
  clay: { id: 'clay', type },
  quartz: { id: 'quartz', type },
  ammonium: { id: 'ammonium', type },
  graphite: { id: 'graphite', type },
  laterite: { id: 'laterite', type },
  astronium: { id: 'astronium', type },

  // Location-specific natural resources
  sphalerite: { id: 'sphalerite', type },
  wolframite: { id: 'wolframite', type },
  malachite: { id: 'malachite', type },
  lithium: { id: 'lithium', type },
  hematite: { id: 'hematite', type },
  titanite: { id: 'titanite', type },
}))(MaterialType.NATURAL);

export type NaturalKeys = keyof typeof naturals;

export type NaturalResources = Record<NaturalKeys, IBaseMaterial>;

export const NaturalResource: NaturalResources = Object.entries(
  naturals,
).reduce(
  (o, [k, mat]) => ({ ...o, [k]: new BaseMaterial(mat) }),
  {} as NaturalResources,
);

//
