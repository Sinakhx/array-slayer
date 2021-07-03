export const difference = (arr1, arr2) => {
  const arr2Set = new Set(arr2);
  return arr1.filter((arrItem) => !arr2Set.has(arrItem));
};
