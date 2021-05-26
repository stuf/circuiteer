import * as mods from 'core/data/modules';

export const color = {
  production: '#10B981',
  usage: '#EF4444',
};

export const Tier = {
  OTHER: -1,
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  XLARGE: 4,
};

export const TierName = {
  [Tier.OTHER]: 'other',
  [Tier.SMALL]: 'small',
  [Tier.MEDIUM]: 'medium',
  [Tier.LARGE]: 'large',
  [Tier.XLARGE]: 'extraLarge',
};

/**
 * @type {Game.IDifficulty}
 */
export const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  VERY_HARD: 'veryHard',
};

/**
 * @type {Game.IPowerStrength}
 */
export const PowerStrength = {
  VERY_LOW: 0.25,
  LOW: 0.5,
  MEDIUM: 1,
  HIGH: 1.5,
  VERY_HIGH: 1.75,
};

export const PowerStrengthLabel = {
  [PowerStrength.VERY_LOW]: 'veryLow',
  [PowerStrength.LOW]: 'low',
  [PowerStrength.MEDIUM]: 'medium',
  [PowerStrength.HIGH]: 'high',
  [PowerStrength.VERY_HIGH]: 'veryHigh',
};

/**
 * @readonly
 * @enum {PowerType}
 */
export const PowerType = {
  ALWAYS: 'always',
  POWERED: 'powered',
  SUN: 'sun',
  WIND: 'wind',
};

/**
 * @type {ModuleDict}
 */
// export const modules = {};
export const modules = [
  ...mods.small,
  ...mods.medium,
  ...mods.large,
  ...mods.extraLarge,
  ...mods.other,
].reduce((o, it) => ({ ...o, [it.id]: it }), {});
