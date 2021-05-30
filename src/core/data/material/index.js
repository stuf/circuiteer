/**
 * Material lookups
 */

/**
 *
 */
export const natural = {
  soil: { type: 'natural' },
  organic: { type: 'natural' },
  compound: { type: 'natural' },
  resin: { type: 'natural' },
};

export const refined = {
  coal: {
    type: 'refined',
    from: 'organic',
  },
};

export const composite = {
  rubber: {
    type: 'composite',
    from: ['organic', 'resin'],
  },
  plastic: {
    type: 'composite',
    from: ['compound', 'coal'],
  },
};

export const atmospheric = {
  hydrogen: {
    type: 'atmospheric',
  },
};
