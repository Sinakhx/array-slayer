export const reverse = (arr) => {
  const copy = arr.slice();
  const len = arr.length;
  const middleItem = Math.floor(len / 2);
  for (let i = 0; i < middleItem; i++) {
    [copy[i], copy[len - 1 - i]] = [copy[len - 1 - i], copy[i]];
  }
  return copy;
};
