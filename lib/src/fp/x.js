export const xsplice = (arr, targetIndex, howManyToRemove = 0, ...newItems) => {
  const copy = arr.slice();
  copy.splice(targetIndex, howManyToRemove, ...newItems);
  return copy;
};

export const xpop = (arr) => {
  const copy = arr.slice();
  copy.pop();
  return copy;
};

export const xpush = (arr, ...items) => {
  const copy = arr.slice();
  copy.push(...items);
  return copy;
};

export const xshift = (arr) => {
  const copy = arr.slice();
  copy.shift();
  return copy;
};

export const xunshift = (arr, ...items) => {
  const copy = arr.slice();
  copy.unshift(...items);
  return copy;
};
