export const deleteByValues = (arr = [], ...selectedValues) => {
  // removes items from array (changes the array length)
  const serializedSelection = [...selectedValues].map((item) => JSON.stringify(item));
  const values = new Set([...serializedSelection]);
  return arr.filter((item) => !values.has(JSON.stringify(item)));
};
