// #region Canvas

/**
 * Current "mouse mode" of the canvas
 */
export const Action = {
  /**
   * Default, no action happening
   */
  NONE: null,
  /**
   * Dragging an existing element
   */
  DRAG: 'drag',
  /**
   * Adding a new element onto the canvas
   */
  ADD_NEW: 'addNew',
};

// #endregion

//

export const Pattern = {
  DIAGONAL: 'diagonal',
};

//

export const Difficulty = {
  EASY: 'easy',
  MEDIUM: 'medium',
  HARD: 'hard',
  VERY_HARD: 'veryHard',
};

export const Efficiency = {
  VERY_LOW: 0.25,
  LOW: 0.5,
  MEDIUM: 1,
  HIGH: 1.5,
  VERY_HIGH: 1.75,
};

export const EfficiencyI = {
  0.25: 'veryLow',
  0.5: 'low',
  1: 'medium',
  1.5: 'high',
  1.75: 'veryHigh',
};

export const Tier = {
  1: 'small',
  2: 'medium',
  3: 'large',
  4: 'extraLarge',
};

export const TierI = {
  small: '1',
  medium: '2',
  large: '3',
  extraLarge: '4',
};

export const PowerType = {
  ON_DEMAND: 'onDemand',
  CONSTANT: 'constant',
  SOLAR: 'solar',
  WIND: 'wind',
  POWERED: 'powered', // still needed?
};
