import { ISNAN, PRIMITIVE_TYPES } from "../../utils/helpers.js";

export const findAllOccurences = (arr = [], value, findBy = (item) => item) => {
  const indexes = [];
  const needsFormat = ISNAN(value) || !PRIMITIVE_TYPES.has(typeof value);
  if (needsFormat) {
    const _value = JSON.stringify(value);
    arr.map(findBy).forEach((item, index) => {
      if (JSON.stringify(item) === _value) indexes.push(index);
    });
  } else {
    arr.map(findBy).forEach((item, index) => {
      if (item === value) indexes.push(index);
    });
  }
  return indexes;
};
