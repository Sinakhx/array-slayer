import { ISNAN, isObject, PRIMITIVE_TYPES } from "../../utils/helpers.js";
import { isUnique } from "./is.js";

export const has = (arr, item) => {
    if (PRIMITIVE_TYPES.has(typeof item) || ISNAN(item)) {
      return new Set(arr).has(item);
    }
    return arr.map((arrItem) => JSON.stringify(arrItem)).includes(JSON.stringify(item));
}

export const hasDuplicates = (arr) => !isUnique(arr);

export const hasArray = (arr) => arr.some((item) => Array.isArray(item));

export const hasObject = (arr) => arr.some(isObject);

export const hasEmptyArr = (arr) => arr.some((item) => Array.isArray(item) && item.length === 0);

export const hasEmptyObj = (arr) => arr.some((item) => isObject(item) && Object.keys(item).length === 0);

export const hasNull = (arr) => new Set(arr).has(null);

export const hasUndefined = (arr) => new Set(arr).has(undefined);

export const hasNullish = (arr) => {
    const set = new Set(arr);
    return set.has(null) || set.has(undefined);
}

export const hasNaN = (arr) => new Set(arr).has(NaN);

export const hasTrue = (arr) => new Set(arr).has(true);

export const hasFalse = (arr) => new Set(arr).has(false);

export const hasBoolean = (arr) => {
    const arrSet = new Set(arr);
    return arrSet.has(false) || arrSet.has(true);
};

export const hasNumber = (arr) => arr.some((item) => typeof item === "number" && !isNaN(item));

export const hasString = (arr) => arr.some((item) => typeof item === "string");

export const hasTruthy = (arr) => arr.some((item) => !!item);

export const hasFalsy = (arr) => arr.some((item) => !item);

export const hasAll = (arr, primitives = []) => {
    const set = new Set(arr);
    return primitives.every(primitive => set.has(primitive));
};

export const hasAllTypes = (arr, types = []) => {
    const set = new Set(arr);
    return types.every(type => set.has(typeof type));
};
