export const clear = (arr = []) => arr.splice(0);

export const clearByIndexes = (arr = [], ...selectedIndexes) => {
  // replaces the values by undefined (keeps the array length)
  const copy = arr.slice();
  [...selectedIndexes].forEach((index) => {
    if (copy[index] !== undefined) {
      copy[index] = undefined;
    }
  });
  return copy;
};

export const clearByValues = (arr = [], ...selectedValues) => {
  const serializedSelection = [...selectedValues].map((item) => JSON.stringify(item));
  const values = new Set([...serializedSelection]);
  return arr.map((item) => (!values.has(JSON.stringify(item)) ? item : undefined));
};
