/**
 * compares the elements from two arrays
 * @param {array} array1 
 * @param {array} array2 
 * @param {function} fn comparison function --- fn(array1[i], array2[i + step], i)
 * @param {object} options
 * @param {number=} options.step  difference in index between the arrays (applied to the second array) [default: 0]
 * @param {function=} options.find  function to find the first element that returns true in comparison [default: undefined]
 * @returns {array} array of compared values
 */
export const compare = (array1, array2, fn, { step = 0, find } = {}) => {
    const len = Math.max(array1.length, array2.length);
    const result = [];
    for (let i = 0; i < len; i++) {
        const compared = fn(array1[i], array2[i + step], i);
        if (find && find(compared, array1[i], array2[i + step], i)) return compared;
        result.push(compared);
    }
    return result;
};
