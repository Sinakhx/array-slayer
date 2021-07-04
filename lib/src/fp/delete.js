export const deleteByIndexes = (arr = [], ...selectedIndexes) => {
  // removes items from array (changes the array length)
  const indexes = new Set([...selectedIndexes]);
  return arr.filter((_, idx) => !indexes.has(idx));
};

export const deleteByValues = (arr = [], ...selectedValues) => {
  const serializedSelection = [...selectedValues].map((item) => JSON.stringify(item));
  const values = new Set([...serializedSelection]);
  return arr.filter((item) => !values.has(JSON.stringify(item)));
};
