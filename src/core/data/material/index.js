/**
 * Material lookups
 */

/**
 *
 */
const natural = {
  soil: {},
  organic: {},
  compound: {},
  resin: {},
};

const refined = {
  coal: {
    from: 'organic',
  },
};

const composite = {
  rubber: {
    from: ['organic', 'resin'],
  },
  plastic: {
    from: ['compound', 'coal'],
  },
};

const atmospheric = {
  hydrogen: {},
};
