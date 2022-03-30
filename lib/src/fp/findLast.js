/**
 * like Array.prototype.find, but returns the last matching element
 * @param {array} arr 
 * @param {function} callback 
 * @param {any} thisArg 
 * @returns any
 */
const findLast = (arr, callback, thisArg) => {
    for (let index = arr.length - 1; index >= 0; index--) {
        const value = arr[index];
        if (callback.call(thisArg, value, index, arr)) {
            return value;
        }
    }
    return undefined;
};
