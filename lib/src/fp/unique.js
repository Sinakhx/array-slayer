export const unique = (arr) => [...new Set(arr)];

export const uniqueBy = (iteratee, arr = []) => {
  let items = [];
  if (typeof iteratee === "function") {
    items = arr.map(iteratee);
  }
  if (typeof iteratee === "string") {
    const keys = iteratee.split(".");
    items = arr.map((item) => keys.reduce((a, b) => a[b], item));
  }
  if (typeof iteratee !== "function" && typeof iteratee !== "string") {
    throw new Error("iteratee has to be either of type 'string' or 'function'");
  }

  const sortedItems = items.slice().sort();
  const duplicateResults = [];
  for (let i = 0; i < sortedItems.length - 1; i++) {
    if (sortedItems[i + 1] == sortedItems[i]) {
      duplicateResults.push(sortedItems[i]);
    }
  }
  const duplicates = new Set(duplicateResults);
  const uniq = items.map((item, index) => (duplicates.has(item) ? undefined : index));
  const indexes = new Set(uniq);
  indexes.delete(undefined);
  return [...indexes].map((index) => arr[index]);
};
