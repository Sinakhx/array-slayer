// (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B)
export const symmetricDifference = (arr1, arr2) => {
  const arr1Set = new Set(arr1);
  const arr2Set = new Set(arr2);
  const left = [...arr1Set].filter((arrItem) => !arr2Set.has(arrItem));
  const right = [...arr2Set].filter((arrItem) => !arr1Set.has(arrItem));
  return left.concat(right);
};
