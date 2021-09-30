import { isPrimitive } from "../../utils/helpers.js";

export const swapByIndexes = (arr = [], index1, index2) => {
  const copy = arr.slice();
  [copy[index1], copy[index2]] = [copy[index2], copy[index1]];
  return copy;
};

export const swapByValues = (arr = [], value1, value2) => {
  let copy = arr.slice();
  let val1 = value1;
  let val2 = value2;
  if (!isPrimitive(value1) || !isPrimitive(value2)) {
    copy = arr.map((item) => JSON.stringify(item));
    val1 = JSON.stringify(val1);
    val2 = JSON.stringify(val2);
  }
  const index1 = copy.findIndex((item) => item === val1);
  const index2 = copy.findIndex((item) => item === val2);
  if (!(index1 > -1 && index2 > -1)) {
    throw new Error("the value you are looking for is not present in the array.");
  }
  [copy[index1], copy[index2]] = [copy[index2], copy[index1]];
  return copy;
};
