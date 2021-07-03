export const shuffle = (arr) => {
    // Modern Fisher-Yates Algorithm
    const copy = arr.slice();
    const len = copy.length - 1;
    let j, x, i;
    for (i = len; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = copy[i];
      copy[i] = copy[j];
      copy[j] = x;
    }
    return copy;
}