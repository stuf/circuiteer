import * as I from 'infestines';

/**
 * @constructor
 * @param {string} id
 * @param {string} src
 * @param {*} opts
 * @returns
 */
export function IconObject(id, src, opts) {
  if (!I.isInstanceOfU(IconObject, this)) return new IconObject(id, src, opts);

  this.id = id;
  this.src = src;
  this.opts = opts;
}

IconObject.prototype.toJSON = function IconObject$toJSON() {
  return {
    src: this.src,
    id: this.id,
    opts: this.opts,
  };
};

//

/**
 *
 * @param {*} object
 * @returns {App.Data.Module}
 * @constructor
 */
export function Module(object) {
  if (!I.isInstanceOfU(Module, this)) return new Module(object);
}

/**
 *
 */
export const SmallModule = I.inherit(function SmallModule(object) {
  if (!I.isInstanceOfU(SmallModule, this)) return new SmallModule(object);

  Module.call(this);
}, Module);
