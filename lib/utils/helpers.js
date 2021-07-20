const PRIMITIVE_TYPES = new Set(["string", "number", "boolean", "null", "undefined", "symbol"]);
const ISNAN = (item) => isNaN(item) && typeof item === "number";
const isObject = (item) => typeof item === "object" && item !== null && Array.isArray(item) === false;

const serialize = JSON.stringify;
const deserialize = JSON.parse;
const clonedeep = (obj) => JSON.parse(JSON.stringify(obj));

const checkLengths = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    throw new Error("Arrays must be of the same lengths in a logical operation");
  }
};

const randBetween = (a, b) => {
  return Math.floor(Math.random() * (b - a + 1)) + a;
};

export {
  serialize,
  deserialize,
  clonedeep,
  randBetween,
  checkLengths,
  ISNAN,
  isObject,
  PRIMITIVE_TYPES,
};
