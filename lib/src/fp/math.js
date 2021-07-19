export const max = (...arrs) => Math.max(...arrs.flat(Infinity));
export const min = (...arrs) => Math.min(...arrs.flat(Infinity));

export const maxOf = (arr, iteratee) => {
  // returns the "column" element of the array in which iteratee is max
  if (typeof iteratee === "function") {
    return Math.max(...arr.map(iteratee));
  }
  if (typeof iteratee === "string") {
    const keys = iteratee.split(".");
    if (keys.length === 1) {
      return Math.max(...arr.map((item) => item[keys[0]]));
    }
    const res = arr.map((item) => keys.reduce((a, b) => a[b], item));
    return Math.max(...res);
  }
  throw new Error("iteratee has to be either of type 'string' or 'function'");
};

export const minOf = (arr, iteratee) => {
  // returns the "column" element of the array in which iteratee is min
  if (typeof iteratee === "function") {
    return Math.min(...arr.map(iteratee));
  }
  if (typeof iteratee === "string") {
    const keys = iteratee.split(".");
    if (keys.length === 1) {
      return Math.min(...arr.map((item) => item[keys[0]]));
    }
    const res = arr.map((item) => keys.reduce((a, b) => a[b], item));
    return Math.min(...res);
  }
  throw new Error("iteratee has to be either of type 'string' or 'function'");
};

export const maxBy = (arr, iteratee) => {
  // returns the "main" element of the array in which iteratee is max
  if (typeof iteratee === "function") {
    const max = Math.max(...arr.map(iteratee));
    return arr.find((item) => iteratee(item) === max);
  }
  if (typeof iteratee === "string") {
    const keys = iteratee.split(".");
    if (keys.length === 1) {
      const max = Math.max(...arr.map((item) => item[keys[0]]));
      return arr.find((item) => item[keys[0]] === max);
    }
    const res = arr.map((item) => keys.reduce((a, b) => a[b], item));
    const max = Math.max(...res);
    return arr.find((_, index) => res[index] === max);
  }
  throw new Error("iteratee has to be either of type 'string' or 'function'");
};

export const minBy = (arr, iteratee) => {
  // returns the "main" element of the array in which iteratee is min
  if (typeof iteratee === "function") {
    const min = Math.min(...arr.map(iteratee));
    return arr.find((item) => iteratee(item) === min);
  }
  if (typeof iteratee === "string") {
    const keys = iteratee.split(".");
    if (keys.length === 1) {
      const min = Math.min(...arr.map((item) => item[keys[0]]));
      return arr.find((item) => item[keys[0]] === min);
    }
    const res = arr.map((item) => keys.reduce((a, b) => a[b], item));
    const min = Math.min(...res);
    return arr.find((_, index) => res[index] === min);
  }
  throw new Error("iteratee has to be either of type 'string' or 'function'");
};

export const sum = (arr) => arr.reduce((a, b) => a + b, 0);

export const sumOf = (arr, iteratee) => {
  let res = 0;
  if (typeof iteratee === "function") {
    for (let item of arr) {
      res += iteratee(item);
    }
    return res;
  }
  if (typeof iteratee === "string") {
    const keys = iteratee.split(".");
    for (let item of arr) {
      let obj = item[keys[0]];
      for (let i = 1; i < keys.length; i++) {
        obj = obj[keys[i]];
      }
      res += obj;
    }
    return res;
  }
  throw new Error("iteratee has to be either of type 'string' or 'function'");
};

export const mean = (arr) => arr.reduce((a, b) => a + b, 0) / arr.length;

export const meanOf = (arr, iteratee) => {
  const sum = sumOf(arr, iteratee);
  return sum / arr.length;
};

export const product = (arr) => arr.reduce((a, b) => a * b, 1);

export const productOf = (arr, iteratee) => {
  let res = 1;
  if (typeof iteratee === "function") {
    for (let item of arr) {
      res *= iteratee(item);
    }
    return res;
  }
  if (typeof iteratee === "string") {
    const keys = iteratee.split(".");
    for (let item of arr) {
      let obj = item[keys[0]];
      for (let i = 1; i < keys.length; i++) {
        obj = obj[keys[i]];
      }
      res *= obj;
    }
    return res;
  }
  throw new Error("iteratee has to be either of type 'string' or 'function'");
};
