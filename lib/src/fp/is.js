export const isEmpty = (arr) => arr.length === 0;

export const isUnique = (arr) => {
    if (arr.length !== [...new Set(arr)].length) return false;
    const newArr = arr.map((item) => (typeof item === "object" && (item !== null ? JSON.stringify(item) : item)));
    return newArr.length === [...new Set(newArr)].length;
};

export const isEqual = (arr1, arr2) => JSON.stringify(arr1) === JSON.stringify(arr2);
