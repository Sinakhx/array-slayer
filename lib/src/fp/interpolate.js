export const interpolate = (arr1 = [], arr2 = []) => {
  / * Linear Interpolation */;
  // A     a
  // B     x = ?
  // C     c
  if (arr1.length !== 3) {
    throw new Error(
      'left array length must be 3, representing the "starting", "middle" & "final" values respectively.'
    );
  }
  if (arr2.length !== 3 || ![undefined, null, false, "x", "X", "?"].includes(arr2[1])) {
    throw new Error("right array length must be 3, representing the [$starting_value, undefined, $final_value].");
  }
  const [A, B, C] = arr1;
  const [a, , c] = arr2;
  return c - ((c - a) * (C - B)) / (C - A);
};
