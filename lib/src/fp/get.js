export const getTruthyValues = (arr) => arr.filter((item) => !!item);
export const getFalsyValues = (arr) => arr.filter((item) => !item);
export const getAllKeys = (arr) => Object.keys(arr);
