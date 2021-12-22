// inspired by SQL's "GROUP BY"
export const groupBy = (arr, fn) => {
    const group = {};
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const groupName = fn(arr[i], i, arr);
        if (typeof groupName !== "string" && typeof groupName !== "number") {
            throw new TypeError("cannot accept values that are not strings or numbers as group names. see 'groupByToMap' instead.");
        }
        if (group[groupName] === undefined) {
            group[groupName] = [];
        }
        group[groupName].push(arr[i]);
    }
    return group;
};

// returns Map instead of Object
export const groupByToMap = (arr, fn) => {
    const group = new Map();
    const len = arr.length;
    for (let i = 0; i < len; i++) {
        const groupName = fn(arr[i], i, arr);
        if (group.get(groupName) === undefined) {
            group.set(groupName, []);
        }
        group.set(groupName, group.get(groupName).concat(arr[i]));
    }
    return group;
};

//example:
const products = [
    { name: "apples", category: "fruits" },
    { name: "oranges", category: "fruits" },
    { name: "potatoes", category: "vegetables" },
];

const groupByCategory = groupBy(products, (product) => product.category);
console.log(groupByCategory);
// {
//   'fruits': [
//     { name: 'apples', category: 'fruits' },
//     { name: 'oranges', category: 'fruits' },
//   ],
//   'vegetables': [
//     { name: 'potatoes', category: 'vegetables' }
//   ]
// }

const groupByCategoryToMap = groupByToMap(products, (product) => product.category);
console.log(groupByCategoryToMap);
// Map([
//   ['fruits', [
//     { name: 'apples', category: 'fruits' },
//     { name: 'oranges', category: 'fruits' },
//   ]],
//   ['vegetables', [
//     { name: 'potatoes', category: 'vegetables' }
//   ]
// ])
