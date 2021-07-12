export const deleteByIndexes = (arr = [], ...selectedIndexes) => {
  // removes items from array (changes the array length)
  const indexes = new Set([...selectedIndexes]);
  return arr.filter((_, idx) => !indexes.has(idx));
};
