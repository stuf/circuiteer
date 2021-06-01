// Mock DataTransfer objects
window.DataTransfer = class DataTransfer {
  constructor() {
    this.dropEffect = 'none';
  }

  setData() {}

  getData() {}

  clearData() {}
};
