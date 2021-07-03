export const findDuplicates = (arr) => {
  const sortedArr = arr.slice().sort();
  const results = [];
  for (let i = 0; i < sortedArr.length - 1; i++) {
    if (sortedArr[i + 1] == sortedArr[i]) {
      results.push(sortedArr[i]);
    }
  }
  return [...new Set(results)];
};
