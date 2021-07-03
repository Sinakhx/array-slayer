export const rotate = (arr = [], count = 0, direction = "clockwise") => {
  if (count <= 0) return arr;
  const index = count % arr.length;
  if (direction === "clockwise") {
    return arr.slice(-1 * index).concat(arr.slice(0, -1 * index));
  } else if (direction === "counterclockwise") {
    return arr.slice(index).concat(arr.slice(0, index));
  } else {
    throw new Error(
      '"direction" prop can only be either "clockwise" or "counterclockwise". The value you have provided is not valid.'
    );
  }
};
