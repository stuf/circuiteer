/**
 * Material lookups
 */

/**
 *
 */
const natural = {
  soil: { type: 'natural' },
  organic: { type: 'natural' },
  compound: { type: 'natural' },
  resin: { type: 'natural' },
};

const refined = {
  coal: {
    type: 'refined',
    from: 'organic',
  },
};

const composite = {
  rubber: {
    type: 'composite',
    from: ['organic', 'resin'],
  },
  plastic: {
    type: 'composite',
    from: ['compound', 'coal'],
  },
};

const atmospheric = {
  hydrogen: {
    type: 'atmospheric',
  },
};
