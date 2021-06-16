export const ctor = (...args) => {
  console.log('ctor non-mock', args);
};

export class MockClass {
  constructor(...args) {
    this.args = args;
  }
}
