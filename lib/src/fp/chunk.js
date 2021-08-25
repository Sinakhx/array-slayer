import { checkArray } from "../../utils/helpers.js";

export const chunk = (size, arr) => {
  checkArray(arr);
  if (size < 0 || !size) throw new Error("size should be defined as a positive value");
  const res = [];
  const count = Math.ceil(arr.length / size);
  for (let i = 0; i < count; i++) {
    res.push(arr.slice(i * size, i * size + size));
  }
  return res;
};
