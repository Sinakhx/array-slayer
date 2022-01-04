// like string.prototype.repeat but for arrays
export const repeat = (arr = [], count = 2) => Array.from({ length: count }, () => arr).flat();
