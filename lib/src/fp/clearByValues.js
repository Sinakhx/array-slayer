export const clearByValues = (arr = [], ...selectedValues) => {
  const serializedSelection = [...selectedValues].map((item) => JSON.stringify(item));
  const values = new Set([...serializedSelection]);
  return arr.map((item) => (!values.has(JSON.stringify(item)) ? item : undefined));
};
