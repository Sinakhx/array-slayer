# array-slayer
## About
With the array-slayer utility library you have:

- smooth experice of functional programming tackling daily problems with arrays.
- faster development speed by letting array-slayer solve usual problems for you.
- ability to chain methods or import a single method as a seperate module.
- much more readable & consice code for reviewing.
- lightweight: only about ~16kbs (full-featured bundle)

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
    - [AND](#and)
    - [AND_ALL](#andall)
    - [AND_OR](#andor)
    - [OR](#or)
    - [OR_ALL](#orall)
    - [OR_AND](#orand)
    - [XOR_ALL](#xorall)
1. [chunk](#chunk)
1. [clear](#clear)
1. [clearByIndexes](#clearbyindexes)
1. [clearByValues](#clearbyvalues)
1. [column](#column)
1. [count](#count)
1. [deleteByIndexes](#deletebyindexes)
1. [deleteByValues](#deletebyvalues)
1. [difference](#difference)
1. [findAllOccurences](#findAllOccurences)
1. [findDuplicates](#findDuplicates)
1. [get](#get)
    - [getTruthyValues](#gettruthyvalues)
    - [getFalsyValues](#getfalsyvalues)
    - [getAllKeys](#getallkeys)
1. [has](#has)
    - [has](#has)
    - [hasAll](#hasall)
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

#### **AND**

can check if every single item in array is equal to the given constant

```js
import B from "array-slayer/booleans.js";

const flag = true;
const array = [true, true, true, true];

// B([a, b, c]).AND(flag) => (a === flag) && (b === flag) && (c === flag)
const result = B(array).AND(flag);
console.log(result); // -> true
```

can also check if a filter function passes on every single item in an array

```js
import B from "array-slayer/booleans.js";

const id = 18;
const array = [-1, 5, 2, 4];

// B([a, b, c]).AND(item, fn) => (fn(a, item)) && (fn(b, item)) && (fn(c, item))
const result = B(array).AND(id, item => item < id);
console.log(result); // -> true
```

can also check if two arrays of the same length, have the same items in the same order

```js
import B from "array-slayer/booleans.js";

const array1 = [-1, 5, 2, true];
const array2 = [-1, 5, 2, false];

// B([a, b, c]).AND([e, f, g]) => (a === e) && (b === f) && (c === g)
const result = B(array1).AND(array2);
console.log(result); // -> false
```

can also check if a function passes on each elements of the two arrays of the same length, respectively

```js
import B from "array-slayer/booleans.js";

const array1 = [-1, 5, 2, 8];
const array2 = [-3, 4, 1, 7];

// B([a, b, c]).AND([e, f, g], fn) => (fn(a,e)) && (fn(b,f)) && (fn(c,g))
const result = B(array1).AND(array2, (a,b) => a > b);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **AND_ALL**

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

#### **AND_OR**

ORs all elements of the given array & ANDs the result with an optional argument

```js
import B from "array-slayer/booleans.js";

const flag = false;
const array = [1, 2, 3, true, {}];

// B([a, b, c]).AND_OR(bool) => (a && bool) || (b && bool) || (c && bool)
const result = B(array).AND_OR();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **OR**

can check if at least one item in array is equal to the given constant

```js
import B from "array-slayer/booleans.js";

const flag = true;
const array = [false, false, false, true];

// B([a, b, c]).OR(flag) => (a === flag) || (b === flag) || (c === flag)
const result = B(array).OR(flag);
console.log(result); // -> true
```

can also check if a filter function passes on at least one item in an array

```js
import B from "array-slayer/booleans.js";

const id = 18;
const array = [40, 50, 2, 60];

// B([a, b, c]).OR(item, fn) => (fn(a, item)) || (fn(b, item)) || (fn(c, item))
const result = B(array).OR(id, item => item < id);
console.log(result); // -> true
```

can also check if two arrays of the same length, have at least one common item with the same index

```js
import B from "array-slayer/booleans.js";
// or 'import B from "array-slayer";' alternatively

const array1 = [-1, 5, 2, true];
const array2 = [-1, 1, 7, false];

// B([a, b, c]).OR([e, f, g]) => (a === e) || (b === f) || (c === g)
const result = B(array1).OR(array2);
console.log(result); // -> true
```

can also check if a function passes at least one of the respective elements of the two arrays of the same length

```js
import B from "array-slayer/booleans.js";

const array1 = [70, 1, 2, 8];
const array2 = [-3, 4, 1, 7];

// B([a, b, c]).OR([e, f, g], fn) => (fn(a,e)) || (fn(b,f)) || (fn(c,g))
const result = B(array1).OR(array2, (a,b) => a < b);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **OR_ALL**

ORs all elements of the given array (& optional argument)

```js
import B from "array-slayer/booleans.js";

const array = [1, 2, 3, 0];

// B([a, b, c]).OR_ALL(bool) => (a || bool) && (b || bool) && (c || bool)
const result = B(array).OR_ALL();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

#### **OR_AND**

ANDs all elements of the given array & ORs the result with  an optional argument

```js
import B from "array-slayer/booleans.js";

const flag = true;
const array = [1, 2, 3, 0];

// B([a, b, c]).OR_AND(bool) => (a || bool) && (b || bool) && (c || bool)
const result = B(array).OR_AND(flag);
console.log(result); // -> true
```

#### **XOR_ALL**

XORs all elements of the given array (& optional argument)

```js
import B from "array-slayer/booleans.js";

const array = [1, 2, 3, 0];

const result = B(array).XOR_ALL();
console.log(result); // -> 0
```

**[⬆ back to top](#quick-links)**

## chunk

```js
import { chunk } from "array-slayer/chunk.js";

const array = [1,2,9,7,8,6,2,6,2];
const result = chunk(3, array);
console.log(result); // -> [ [ 1, 2, 9 ], [ 7, 8, 6 ], [ 2, 6, 2 ], [ 7 ] ]
```

or

```js
import _ from "array-slayer";

const array = [1,2,9,7,8,6,2,6,2];
const result = _(array).chunk(3).value;
console.log(result); // -> [ [ 1, 2, 9 ], [ 7, 8, 6 ], [ 2, 6, 2 ], [ 7 ] ]
```

**[⬆ back to top](#quick-links)**

## clear

empties an array (mutates the original array, keeping its reference)

```js
import { clear } from "array-slayer/clear.js";

const array = [1,2,9,7,8,6,2,6,2];
const result = clear(array);
console.log(result); // -> []
```

or

```js
import _ from "array-slayer";

const array = [1,2,9,7,8,6,2,6,2];
const result = _(array).clear().value;
console.log(result); // -> []
```

**[⬆ back to top](#quick-links)**

## clearByIndexes

replaces the values of the given indexes by `undefined` (keeps the array length)

```js
import { clearByIndexes } from "array-slayer/clearByIndexes.js";

const array = [1,2,9,7,8,6,2,6,2];
const result = clearByIndexes(array, 0, 2, 3);
console.log(result); // -> [undefined,2,undefined,undefined,8,6,2,6,2];
```

or

```js
import _ from "array-slayer";

const array = [1,2,9,7,8,6,2,6,2];
const result = _(array).clearByIndexes(0, 2, 3).value;
console.log(result); // -> [undefined,2,undefined,undefined,8,6,2,6,2];
```

**[⬆ back to top](#quick-links)**

## clearByValues

replaces the given values of the given array by `undefined` (keeps the array length)

```js
import { clearByValues } from "array-slayer/clearByValues.js";

const array = [1,2,9,7,8,6,2,6,2];
const result = clearByValues(array, 1, 6, 8);
console.log(result); // -> [undefined,2,9,7,undefined,undefined,2,undefined,2];
```

clearByValues can also compare objects, but it is more costly than clearByIndexes

```js
import _ from "array-slayer";

const array = [4, {id: 12}, "str", {c: [8, {d: "name"}] }, 24];
const result = _(array).clearByValues("str", { c: [8, {d: "name"}] }).value;
console.log(result); // -> [4, {id: 12}, undefined, undefined, 24];
```

**[⬆ back to top](#quick-links)**

## column

returns the selected column from a 2D array or array of objects

```js
import { column } from "array-slayer/column.js";

const array = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const result = column(array, "1");
console.log(result); // -> [2, 5, 8];
```

or

```js
import _ from "array-slayer";

const array = [
    [4, {id: 1}, "baz", {c: [8, {d: "foo"}], f: { e: 5 } }, 24],
    [4, {id: 2}, "foo", {c: [8, {d: "bar"}], f: { e: 6 } }, 24],
    [4, {id: 3}, "bar", {c: [8, {d: "baz"}], f: { e: 7 } }, 24]
];
const result = _(array).column(3, "f.e").value;
console.log(result); // -> [5, 6, 7];
```

**[⬆ back to top](#quick-links)**

## count

returns how many times an item is repeated in an array

```js
import { count } from "array-slayer/count.js";

const array = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
];
const result = count(array, [4,5,6]);
console.log(result); // -> 1
```

or

```js
import _ from "array-slayer";

const array = [1,2,1,5,1,8];
const result = _(array).count(1);
console.log(result); // -> 3
```

**[⬆ back to top](#quick-links)**

## deleteByIndexes

removes array items by the given array indexes (changes the array length)

```js
import { deleteByIndexes } from "array-slayer/deleteByIndexes.js";

const array = [5,6,8,4,1];
const result = deleteByIndexes(array, 0, 2, 3);
console.log(result); // -> [6,1]
```

or

```js
import _ from "array-slayer";

const array = [5,6,8,4,1];
const result = _(array).deleteByIndexes(0, 2, 3).value;
console.log(result); // -> [6,1]
```

**[⬆ back to top](#quick-links)**

## deleteByValues

removes array items by the given array values (changes the array length)

```js
import { deleteByValues } from "array-slayer/deleteByValues.js";

const array = [5,6,8,4,1];
const result = deleteByValues(array, 5, 8, 4);
console.log(result); // -> [6,1]
```

or

```js
import _ from "array-slayer";

const array = [5,6,8,4,1];
const result = _(array).deleteByValues(5, 8, 4).value;
console.log(result); // -> [6,1]
```

**[⬆ back to top](#quick-links)**

## difference

returns an array including the first array's values excluding the second array's values

```js
import { difference } from "array-slayer/difference.js";

const array1 = [5,6,8,4,1];
const array2 = [7,8,9,5,3];
const result = difference(array1, array2);
console.log(result); // -> [6, 4, 1]
```

or

```js
import _ from "array-slayer";

const array1 = [5,6,8,4,1];
const array2 = [7,8,9,5,3];
const result = _(array1).difference(array2).value;
console.log(result); // -> [6, 4, 1]
```

**[⬆ back to top](#quick-links)**

## findAllOccurences

returns the indexes of all occurences of the selected item in array (by value)

```js
import { findAllOccurences } from "array-slayer/findAllOccurences.js";

const array = [5,6,5,5,1,7,8,5];
const result = findAllOccurences(5);
console.log(result); // -> [0, 2, 3, 7]
```

or

```js
import _ from "array-slayer";

const array = [5,6,5,5,1,7,8,5];
const result = _(array).findAllOccurences(5).value;
console.log(result); // -> [0, 2, 3, 7]
```

**[⬆ back to top](#quick-links)**

## findDuplicates

returns the duplicate values in array

```js
import { findDuplicates } from "array-slayer/findDuplicates.js";

const array = [5,6,5,5,1,7,8,5];
const result = findDuplicates(array);
console.log(result); // -> [5]
```

or

```js
import _ from "array-slayer";

const array = [5,6,5,5,1,7,8,5];
const result = _(array).findDuplicates(array).value;
console.log(result); // -> [5]
```

**[⬆ back to top](#quick-links)**

## get

#### **getTruthyValues**

```js
import { getTruthyValues } from "array-slayer/getTruthyValues.js";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = getTruthyValues(array);
console.log(result); // -> [4, true, 1, "", "name", {}, [], f()];
```

or

```js
import _ from "array-slayer";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = _(array).getTruthyValues(array).value;
console.log(result); // -> [4, true, 1, "", "name", {}, [], f()];
```

**[⬆ back to top](#quick-links)**

#### **getFalsyValues**

```js
import { getFalsyValues } from "array-slayer/getFalsyValues.js";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = getFalsyValues(array);
console.log(result); // -> [false, 0];
```

or

```js
import _ from "array-slayer";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = _(array).getFalsyValues(array).value;
console.log(result); // -> [false, 0];
```

**[⬆ back to top](#quick-links)**

#### **getAllKeys**

```js
import { getAllKeys } from "array-slayer/getAllKeys.js";

const array = [{id: 12, name: "foo", lastName: "bar"}];
const result = getAllKeys(array[0]);
console.log(result); // -> ["id", "name", "foo", "lastName"];
```

or

```js
import _ from "array-slayer";

const array = [{id: 12, name: "foo", lastName: "bar"}];
const result = _(array).getAllKeys(array[0]).value;
console.log(result); // -> ["id", "name", "foo", "lastName"];
```

**[⬆ back to top](#quick-links)**

## has

#### **has**

```js
import { has } from "array-slayer/has.js";

const array = [1,2,3,4,5];
const result = has(array, 3);
console.log(result); // -> true
```

or

```js
import _ from "array-slayer";

const array = [{id: 12, name: "foo", lastName: "bar"}];
const result = _(array).has({id: 12, name: "foo", lastName: "bar"});
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasAll**

```js
import { hasAll } from "array-slayer/hasAll.js";

const array = [1,2,3,4,5];
const result = hasAll(array, [2,4,5]);
console.log(result); // -> true
```

or

```js
import _ from "array-slayer";

const array = [1,2,3,4,5];
const result = _(array).hasAll([2,4,5]);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

____________________________________

## License

The [MIT License][license-url] (MIT)

&copy; 2021 Sina Khodabandehloo

[license-url]:  https://github.com/Sinakhx/array-slayer/blob/master/LICENSE