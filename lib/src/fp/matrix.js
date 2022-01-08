// for 1D vectors
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

// for 1D vectors
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

// for 2D Matrices
export const getSurroundingSquares = (arr, x, y, filter = true) => {
    if (x >= arr.length || y >= arr[0].length || x < 0 || y < 0) return [];
    const C = item => item === undefined ? [] : item;
    const result = [
      C(arr[x-1])[y-1], C(arr[x-1])[y], C(arr[x-1])[y+1],
      C(arr[ x ])[y-1],                 C(arr[ x ])[y+1],
      C(arr[x+1])[y-1], C(arr[x+1])[y], C(arr[x+1])[y+1],
    ];
    return filter ? result.filter(i => i !== undefined) : result;
};
