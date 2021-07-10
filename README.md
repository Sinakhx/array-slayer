# array-slayer
## About
With the array-slayer utility library you have:

- smooth experice of functional programming tackling daily problems with arrays.
- faster development speed by letting array-slayer solve usual problems for you.
- much more readable & consice code for reviewing.
- ability to chain methods or import a single method as a seperate module.

## Example usage
```js
import _ from "arraySlayer";

const array = [
    [47,25,1,{ a: "Foo2", b: "Bar1", c: { d: "ct", e: { f: 9 }, g: 1 } }],
    [47,29,2,{ a: "Foo1", b: "Bar2", c: { d: "bg", e: { f: 5 }, g: 4 } }],
    [47,25,3,{ a: "Foo3", b: "Bar3", c: { d: "ce", e: { f: 7 }, g: 3 } }],
    [47,38,4,{ a: "Foo4", b: "Bar4", c: { d: "zd", e: { f: 1 }, g: 4 } }],
];

const result = _(array)
                .column(3, "c.e.f")
                .concat([17, 2, 1, 18])
                .replaceByValue(1, 100)
                .unique()
                .sort({ order: "ascending", sortType: "QuickSort"})
                .value;

console.log(result); //-> [2, 5, 7, 9, 17, 18, 100]
```

of if you need a single method from arraySlayer, you can import it as a seperate module:

```js
import { sort } from "array-slayer/sort.js";

const result = sort(array, { sortType: "MergeSort", sortBy: item => item[3].c.d });

console.log(result); // returns sorted array based on the selected keys
```

## Quick Links
1. [booleans](#booleans)
1. [chunk](#chunk)
1. [clear](#clear)
1. [column](#column)
1. [count](#count)
1. [delete](#delete)
1. [difference](#difference)
1. [findAllOccurences](#findAllOccurences)
1. [findDuplicates](#findDuplicates)
1. [get](#get)
1. [has](#has)
1. [interpolate](#interpolate)
1. [intersection](#intersection)
1. [is](#is)
1. [math](#math)
1. [matrix](#matrix)
1. [random](#random)
1. [range](#range)
1. [readOnly](#readOnly)
1. [replace](#replace)
1. [rotate](#rotate)
1. [shuffle](#shuffle)
1. [sort](#sort)
1. [swap](#swap)
1. [symmetricDifference](#symmetricDifference)
1. [take](#take)
1. [toJSONObject](#toJSONObject)
1. [types](#types)
1. [union](#union)
1. [unique](#unique)
1. [x](#x)

**[⬆ back to top](#quick-links)**

## booleans

**AND_ALL**

ANDs all elements of the given array (& optional argument)

```js
import B from "array-slayer/booleans.js";

let flag = true;
const array = [1, true, {}, "name"];

// B([a, b, c]).AND_ALL(bool) => (a && bool) && (b && bool) && (c && bool)
const result = B(array).AND_ALL(flag);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

**OR_ALL**

ORs all elements of the given array (& optional argument)

```js
import B from "array-slayer/booleans.js";

const array = [1, 2, 3, 0];

// B([a, b, c]).OR_ALL(bool) => (a || bool) && (b || bool) && (c || bool)
const result = B(array).OR_ALL();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

## License

The [MIT License][license-url] (MIT)

&copy; 2021 Sina Khodabandehloo

[license-url]:  https://github.com/Sinakhx/array-slayer/blob/master/LICENSE