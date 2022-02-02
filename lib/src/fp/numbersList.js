/**
 * creates an array of numbers from the starting number up to the ending number with defined step
 * @param {number} start 
 * @param {number} end inclusive
 * @param {number} step default is 1
 * @return {number[]} [start, start + step, start + step * 2, ..., end]
 */
 export const numbersList = (start, end, step = 1) => Array.from( { length: Math.ceil((end - start + 1) / step) }, (_, i) => start + i * step);
