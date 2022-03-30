export const PRIMITIVE_TYPES = new Set(["string", "number", "boolean", "null", "undefined", "symbol"]);
export const ISNAN = (item) => isNaN(item) && typeof item === "number";
export const isObject = (item) => Object.prototype.toString.call(item) === "[object Object]";
export const isPrimitive = (item) => PRIMITIVE_TYPES.has(typeof item);

export const serialize = JSON.stringify;
export const deserialize = JSON.parse;
export const clonedeep = (obj) => ("structuredClone" in globalThis) ? globalThis.structuredClone(obj) : JSON.parse(JSON.stringify(obj));

export const checkLengths = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must be of the same lengths in a logical operation");
  }
};

export const checkArray = (array) => {
  if (Array.isArray(array) === false) throw new Error("parameter should be of type array");
}

export const IterateeError = () => {
  throw new Error("iteratee has to be either of type 'string' or 'function'");
}

export const randBetween = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

export const swap = (a, b) => {
  [a, b] = [b, a];
};

export const and_or = (item, callback, array, key) => {
  const isArr = Array.isArray(item);
  const hasCallback = callback !== undefined;
  if (!isArr && !hasCallback) {
    return array[key]((arrItem) => arrItem === item);
  }
  if (!isArr && hasCallback) {
    return array[key]((arrItem) => callback(arrItem, item));
  }
  if (isArr && !hasCallback) {
    checkLengths(item, Arr);
    return array[key]((arrItem, index) => arrItem === item[index]);
  }
  if (isArr && hasCallback) {
    checkLengths(item, Arr);
    return array[key]((arrItem, index) => callback(arrItem, item[index]));
  }
}

export const _Of = (iteratee, func1, func2) => {
  if (typeof iteratee === "function") {
    return func1();
  }
  if (typeof iteratee === "string") {
    return func2();
  }
  IterateeError();
}

export const min_max = (array, type, arrays) => {
  return !!arrays ? Math[type](...array, ...arrays.flat(Infinity)) : Math[type](...array);
}

export const minOf_maxOf = (array, iteratee, type) => {
  const func1 = () => Math[type](...array.map(iteratee));
  const func2 = () => {
    const keys = iteratee.split(".");
    if (keys.length === 1) {
      return Math[type](...array.map((item) => item[keys[0]]));
    }
    const res = array.map((item) => keys.reduce((a, b) => a[b], item));
    return Math[type](...res);
  }
  return _Of(iteratee, func1, func2);
}

export const minBy_maxBy = (array, iteratee, type) => {
  const func1 = () => array.find((item) => iteratee(item) === Math[type](...Arr.map(iteratee)));
  const func2 = () => {
    const keys = iteratee.split(".");
      if (keys.length === 1) {
        return array.find((item) => item[keys[0]] === Math[type](...array.map((item) => item[keys[0]])));
      }
      return array.find((_, index) => res[index] === Math[type](...array.map((item) => keys.reduce((a, b) => a[b], item))));
  }
  return _Of(iteratee, func1, func2);
}

export const sumOf_productOf = (array, iteratee, type) => {
  let res = type === "+" ? 0 : 1;
  const func1 = () => {
    for (let item of array) {
      res = type === "+" ? res + iteratee(item) : res * iteratee(item);
    }
    return res;
  }
  const func2 = () => {
    const keys = iteratee.split(".");
      for (let item of array) {
        let obj = item[keys[0]];
        for (let i = 1; i < keys.length; i++) {
          obj = obj[keys[i]];
        }
        res = type === "+" ? res + obj : res * obj;
      }
      return res;
  };
  return _Of(iteratee, func1, func2);
}