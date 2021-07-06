import { checkLengths } from "../../utils/helpers.js";

class Booleans {
  constructor(arr = []) {
    this.arr = arr;
  }

  OR(item, callback) {
    // item can be either Array or primitive type
    if (!Array.isArray(item) && callback === undefined) {
      // OR: (item) => (arr[0] === item) || (arr[1] === item) || (arr[2] === item) || ...
      return this.arr.includes(item);
    }
    if (!Array.isArray(item) && callback !== undefined) {
      // OR: (item) => callback(arr[0],item) || callback(arr[1],item) || callback(arr[2],item) || ...
      return this.arr.some((arrItem) => callback(arrItem, item));
    }
    if (Array.isArray(item) && callback === undefined) {
      // OR: (item: []) => (arr[0] === item[0]) || (arr[1] === item[1]) || (arr[2] === item[2]) || ...
      checkLengths(item, this.arr);
      return this.arr.some((arrItem, index) => arrItem === item[index]);
    }
    if (Array.isArray(item) && callback !== undefined) {
      // OR: (item: [])  => callback(arr[0],item[0]) || callback(arr[1],item[1]) || callback(arr[2],item[2]) || ...
      checkLengths(item, this.arr);
      return this.arr.some((arrItem, index) => callback(arrItem, item[index]));
    }
  }

  AND(item, callback) {
    // item can be either Array or primitive type
    if (!Array.isArray(item) && callback === undefined) {
      // AND: (item) => (arr[0] === item) && (arr[1] === item) && (arr[2] === item) && ...
      return this.arr.every((arrItem) => arrItem === item);
    }
    if (!Array.isArray(item) && callback !== undefined) {
      // AND: (item) => callback(arr[0],item) && callback(arr[1],item) && callback(arr[2],item) && ...
      return this.arr.every((arrItem) => callback(arrItem, item));
    }
    if (Array.isArray(item) && callback === undefined) {
      // AND: (item: []) => (arr[0] === item[0]) && (arr[1] === item[1]) && (arr[2] === item[2]) && ...
      checkLengths(item, this.arr);
      return this.arr.every((arrItem, index) => arrItem === item[index]);
    }
    if (Array.isArray(item) && callback !== undefined) {
      // AND: (item: [])  => callback(arr[0],item[0]) && callback(arr[1],item[1]) && callback(arr[2],item[2]) && ...
      checkLengths(item, this.arr);
      return this.arr.every((arrItem, index) => callback(arrItem, item[index]));
    }
  }

  // OR-ALL: [a, b, c] => (a || bool) || (b || bool) || (c || bool)
  OR_ALL(bool = false) {
    return !!bool || this.arr.some((item) => !!item);
  }

  // AND-ALL: [a, b, c] => (a && bool) && (b && bool) && (c && bool)
  AND_ALL(bool = true) {
    return !!bool && this.arr.every((item) => !!item);
  }

  // OR-AND: [a, b, c] => (a || bool) && (b || bool) && (c || bool)
  OR_AND(bool = true) {
    return this.arr.every((item) => !!item || !!bool);
  }

  // AND-OR: [a, b, c] => (a && bool) || (b && bool) || (c && bool)
  AND_OR(bool = true) {
    return this.arr.some((item) => !!item && !!bool);
  }

  XOR_ALL(bool = false) {
    return !!this.arr.map((item) => !!item).reduce((a, b) => a ^ b, false) ^ !!bool;
  }
}

export const booleans = (arr) => new Booleans(arr);
