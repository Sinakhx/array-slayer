import { sortify } from "../../utils/sort.js";
import { reverse } from "./reverse.js";

export const sort = (arr = [], { order = "ascending", sortType = "QuickSort", sortBy } = {}) => {
  // order: "ascending" | "descending"
  // sortType: "QuickSort" | "MergeSort" | "InsertionSort" | "BubbleSort" | "RadixSort" | "HeapSort"
  let _sortBy, hasSortBy;

  if (sortBy !== undefined && typeof sortBy !== "function") {
    throw new Error('"sortBy" has to be a function.');
  }

  if (sortBy) {
    _sortBy = sortBy;
    hasSortBy = true;
  } else {
    _sortBy = (item) => item;
  }

  const types = [...new Set(arr.map((item) => typeof _sortBy(item)))];
  if (types.length > 1) {
    throw new Error("cannot sort items of different types.");
  }

  if (types[0] !== "number" && types[0] !== "string") {
    throw new Error("cannot sort items of complex types. sorting is only possible on numbers or strings.");
  }
  let result = [];
  const lookupTable = {}; // sortItem: mainItem
  const items = arr.map(_sortBy);
  items.forEach((item, index) => {
    lookupTable[item] = arr[index];
  });

  result = sortify[sortType](items);
  if (order === "descending") {
    result = reverse(result);
  }

  const res = [];
  if (hasSortBy) {
    result.map((item) => {
      res.push(lookupTable[item]);
    });
    return res;
  }

  return result;
};
