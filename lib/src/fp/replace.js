import { findAllOccurences } from "./findAllOccurences.js";

export const replaceByIndex = (arr = [], index, newValue) => {
  const copy = arr.slice();
  arr.splice(index, 1, newValue);
  return copy;
};

export const replaceByIndexes = (arr = [], indexes = [], newValues = []) => {
  const copy = arr.slice();
  indexes.forEach((index) => {
    copy[index] = newValues[index];
  });
  return copy;
};

export const replaceByValue = (arr = [], currentItem, newItem, replaceAllOccurences = true) => {
  const copy = arr.slice();
  const indexes = replaceAllOccurences ? findAllOccurences(arr, currentItem) : { value: [arr.indexOf(currentItem)] };
  if (indexes.value[0] > -1) {
    indexes.value.forEach((index) => {
      copy[index] = newItem;
    });
  }
  return copy;
};

export const replaceByValues = (arr = [], currentItems = [], newItems = []) => {
  let copy = arr.slice();
  if (currentItems.length !== newItems.length) {
    throw new Error("can't replace values because the arrays that you have provided are not of equal size.");
  }
  currentItems.forEach((item, index) => {
    copy = replaceByValue(copy, item, newItems[index]);
  });
  return copy;
};
