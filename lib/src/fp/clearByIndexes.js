export const clearByIndexes = (arr = [], ...selectedIndexes) => {
  // replaces the values by undefined (keeps the array length)
  const copy = arr.slice();
  selectedIndexes.forEach((index) => {
    if (copy[index] !== undefined) {
      copy[index] = undefined;
    }
  });
  return copy;
};
