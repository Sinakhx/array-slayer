export const zip = (arr, ...arrays) => arr.map((item, idx) => arrays.reduce((a, b) => [...a, b[idx]], [item])); 