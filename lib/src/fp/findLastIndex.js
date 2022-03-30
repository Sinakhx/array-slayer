/**
 * like Array.prototype.findIndex, but returns the last matching element
 * @param {array} arr
 * @param {function} callback
 * @param {any} thisArg
 * @returns any
 */
const findLastIndex = (arr, callback, thisArg) => {
    for (let index = arr.length - 1; index >= 0; index--) {
        const value = arr[index];
        if (callback.call(thisArg, value, index, arr)) {
            return index;
        }
    }
    return -1;
};
