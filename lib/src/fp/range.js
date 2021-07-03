// start & end are included
export const range = (start, end) => {
  if (start !== undefined && end === undefined) {
    return Array(start + 1).fill().map((_, index) => index);
  }
  return Array(end - start + 1).fill().map((_, index) => start + index);
};
