export const column = (arr, colIndex, key) => {
  if (typeof colIndex === "function") {
    return arr.map(colIndex);
  }
  if (!!key && typeof key === "string") {
    const keys = key.split(".");
    return arr.map((item) => keys.reduce((a, b) => a[b], item[colIndex]));
  }
  if (!!key) {
    throw new Error("key has to be of type 'string'");
  }
  return arr.map((item) => item[colIndex]);
};
