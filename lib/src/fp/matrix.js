export const dotProduct = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    throw new Error("arrays must be of the same length to produce dot product.");
  }
  let result = 0;
  for (let i = 0; i < arr1.length; i++) {
    result += arr1[i] * arr2[i];
  }
  return result;
};

export const crossProduct = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    throw new Error("arrays must be of the same length to produce cross product.");
  }
  if (arr1.length <= 1) return 0;
  if (arr1.length === 2) {
    return [arr1[0] * arr2[1] - arr1[1] * arr2[0]];
  }
  if (arr1.length === 3) {
    return [
      arr1[1] * arr2[2] - arr1[2] * arr2[1],
      arr1[2] * arr2[0] - arr1[0] * arr2[2],
      arr1[0] * arr2[1] - arr1[1] * arr2[0],
    ];
  }
  throw new Error("arrays must be of the length less than or equal to 3.");
};
