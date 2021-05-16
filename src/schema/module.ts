import { Tier } from './tier';

interface IModule<T extends Tier> {
  tier: T;
}

export class Module<T extends Tier> implements IModule<T> {
  tier: T;

  constructor(tier: T) {
    this.tier = tier;
  }
}
