export const ctor = jest.fn();

export class MockClass {
  constructor(...args) {
    this.args = args;
    ctor(...args);
  }
}
