export const chunk = (size, arr) => {
  const res = [];
  const count = Math.ceil(arr.length / size);
  for (let i = 0; i < count; i++) {
    res.push(arr.slice(i * size, i * size + size));
  }
  return res;
};
