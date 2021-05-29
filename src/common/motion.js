/* eslint-disable no-unused-vars */
import { Variants } from 'framer-motion';

export const modal = {
  hidden: {
    scale: 0.95,
    opacity: 0,
  },
  visible: {
    scale: 1,
    opacity: 1,
  },
};

/**
 * @type {Variants}
 */
export const peekInFade = {
  hidden: { opacity: 0, x: '10%', scale: 0.9 },
  visible: { opacity: 1, x: 0, scale: 1 },
};
