import Difference from "./difference.js";

class ArraySlayerBase extends Difference {
    serialize = JSON.stringify;
    clonedeep = obj => JSON.parse(JSON.stringify(obj));
    
    constructor(arr, config) {
      super(arr);
      if (!Array.isArray(arr)) throw new Error("parameter is not Array");
      this.initConfig(config);
      this._originalArray = arr;
      this.arr = arr.slice();
    }
  
    initConfig(config){
      if (!config) return;
      if (config.serialize) this.serialize = config.serialize;
      if (config.clonedeep) this.clonedeep = config.clonedeep;
    }
  
    get value() {
      return this.arr;
    }
  
    get length() {
      return this.arr.length;
    }
}

export default ArraySlayerBase;