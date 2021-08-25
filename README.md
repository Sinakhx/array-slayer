# array-slayer

> 🚨🚨 This project is a work in progress! Issues and pull requests are encouraged. 🚨🚨

## About
With the array-slayer utility library you have:

- smooth experice of functional programming tackling daily problems with arrays.
- faster development speed by letting array-slayer solve usual problems for you.
- ability to chain methods or import a single method as a seperate module.
- much more readable & consice code for reviewing.
- lightweight import: only about ~16kbs (full-featured bundle)
- immutability by nature (methods return a new array)

## Example usage
```js
import ArraySlayer from "arraySlayer";

const array = [
    [47,25,1,{ a: "Foo2", b: "Bar1", c: { d: "ct", e: { f: 9 }, g: 1 } }],
    [47,29,2,{ a: "Foo1", b: "Bar2", c: { d: "bg", e: { f: 5 }, g: 4 } }],
    [47,25,3,{ a: "Foo3", b: "Bar3", c: { d: "ce", e: { f: 7 }, g: 3 } }],
    [47,38,4,{ a: "Foo4", b: "Bar4", c: { d: "zd", e: { f: 1 }, g: 4 } }],
];

const result = ArraySlayer(array)
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
1. [at](#at)
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
    - [hasAllTypes](#hasalltypes)
    - [hasArray](#hasarray)
    - [hasBoolean](#hasboolean)
    - [hasDuplicates](#hasduplicates)
    - [hasEmptyArr](#hasemptyarr)
    - [hasEmptyObj](#hasemptyobj)
    - [hasFalse](#hasfalse)
    - [hasFalsy](#hasfalsy)
    - [hasNaN](#hasnan)
    - [hasNull](#hasnull)
    - [hasNullish](#hasnullish)
    - [hasNumber](#hasnumber)
    - [hasObject](#hasobject)
    - [hasString](#hasstring)
    - [hasTrue](#hastrue)
    - [hasTruthy](#hastruthy)
    - [hasUndefined](#hasundefined)
1. [interpolate](#interpolate)
1. [intersection](#intersection)
1. [is](#is)
    - [isEmpty](#isempty)
    - [isEqual](#isequal)
    - [isUnique](#isunique)
1. [math](#math)
    - [max](#max)
    - [maxBy](#maxby)
    - [maxOf](#maxof)
    - [mean](#mean)
    - [meanOf](#meanof)
    - [min](#min)
    - [minBy](#minby)
    - [minOf](#minof)
    - [product](#product)
    - [productOf](#productof)
    - [sum](#sum)
    - [sumOf](#sumof)
1. [matrix](#matrix)
    - [dotProduct](#dotproduct)
    - [crossProduct](#crossproduct)
1. [random](#random)
1. [range](#range)
1. [readOnly](#readOnly)
1. [replace](#replace)
    - [replaceByIndex](#replacebyindex)
    - [replaceByIndexes](#replacebyindexes)
    - [replaceByValue](#replacebyvalue)
    - [replaceByValues](#replacebyvalues)
1. [rotate](#rotate)
1. [shuffle](#shuffle)
1. [sort](#sort)
1. [swap](#swap)
    - [swapByIndexes](#swapbyindexes)
    - [swapByValues](#swapbyvalues)
1. [symmetricDifference](#symmetricDifference)
1. [take](#take)
1. [toJSONObject](#toJSONObject)
1. [types](#types)
1. [union](#union)
1. [unique](#unique)
    - [unique](#unique)
    - [uniqueBy](#uniqueby)
1. [x](#x)
    - [xpop](#xpop)
    - [xpush](#xpush)
    - [xshift](#xshift)
    - [xunshift](#xunshift)
    - [xsplice](#xsplice)
1. [zip](#zip)
    - [zip](#zip)
    - [unzip](#unzip)

**[⬆ back to top](#quick-links)**

## Specific Chain Methods
- [Native JS Methods](#native-js-methods)
- [deepCopy](#deepcopy)
- [lastElement](#lastelement)
- [length](#length)
- [mutate](#mutate)
- [value](#value)

## Advanced Configuration
- [configuring deepCopy](#configuring-deepcopy)
- [configuring serialization](#configuring-serialization)

**[⬆ back to top](#quick-links)**


## **at**

returns the value from the given array index. (argument can also be a negative number corresponding to counting from end of the array)

```js
import Arr from "array-slayer";

const numbers = [1, 2, 3, 4, 5];

const secondItem = Arr(numbers).at(1);       // -> 2
const lastItem = Arr(numbers).at(-1);        // -> 5
const nextToLastItem = Arr(numbers).at(-2);  // -> 4
```

**[⬆ back to top](#quick-links)**

## booleans

#### **AND**

can check if every single item in array is equal to the given constant

```js
import Bools from "array-slayer/booleans.js";

const flag = true;
const array = [true, true, true, true];

// Bools([a, b, c]).AND(flag) => (a === flag) && (b === flag) && (c === flag)
const result = Bools(array).AND(flag);
console.log(result); // -> true
```

can also check if a filter function passes on every single item in an array

```js
import Bools from "array-slayer/booleans.js";

const id = 18;
const array = [-1, 5, 2, 4];

// Bools([a, b, c]).AND(item, fn) => (fn(a, item)) && (fn(b, item)) && (fn(c, item))
const result = Bools(array).AND(id, item => item < id);
console.log(result); // -> true
```

can also check if two arrays of the same length, have the same items in the same order

```js
import Bools from "array-slayer/booleans.js";

const array1 = [-1, 5, 2, true];
const array2 = [-1, 5, 2, false];

// Bools([a, b, c]).AND([e, f, g]) => (a === e) && (b === f) && (c === g)
const result = Bools(array1).AND(array2);
console.log(result); // -> false
```

can also check if a function passes on each elements of the two arrays of the same length, respectively

```js
import Bools from "array-slayer/booleans.js";

const array1 = [-1, 5, 2, 8];
const array2 = [-3, 4, 1, 7];

// Bools([a, b, c]).AND([e, f, g], fn) => (fn(a,e)) && (fn(b,f)) && (fn(c,g))
const result = Bools(array1).AND(array2, (a,b) => a > b);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **AND_ALL**

ANDs all elements of the given array (& optional argument)

```js
import Bools from "array-slayer/booleans.js";

let flag = true;
const array = [1, true, {}, "name"];

// Bools([a, b, c]).AND_ALL(bool) => (a && bool) && (b && bool) && (c && bool)
const result = Bools(array).AND_ALL(flag);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **AND_OR**

ORs all elements of the given array & ANDs the result with an optional argument

```js
import Bools from "array-slayer/booleans.js";

const flag = false;
const array = [1, 2, 3, true, {}];

// Bools([a, b, c]).AND_OR(bool) => (a && bool) || (b && bool) || (c && bool)
const result = Bools(array).AND_OR();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **OR**

can check if at least one item in array is equal to the given constant

```js
import Bools from "array-slayer/booleans.js";

const flag = true;
const array = [false, false, false, true];

// Bools([a, b, c]).OR(flag) => (a === flag) || (b === flag) || (c === flag)
const result = Bools(array).OR(flag);
console.log(result); // -> true
```

can also check if a filter function passes on at least one item in an array

```js
import Bools from "array-slayer/booleans.js";

const id = 18;
const array = [40, 50, 2, 60];

// Bools([a, b, c]).OR(item, fn) => (fn(a, item)) || (fn(b, item)) || (fn(c, item))
const result = Bools(array).OR(id, item => item < id);
console.log(result); // -> true
```

can also check if two arrays of the same length, have at least one common item with the same index

```js
import Bools from "array-slayer/booleans.js";
// or 'import Bools from "array-slayer";' alternatively

const array1 = [-1, 5, 2, true];
const array2 = [-1, 1, 7, false];

// Bools([a, b, c]).OR([e, f, g]) => (a === e) || (b === f) || (c === g)
const result = Bools(array1).OR(array2);
console.log(result); // -> true
```

can also check if a function passes at least one of the respective elements of the two arrays of the same length

```js
import Bools from "array-slayer/booleans.js";

const array1 = [70, 1, 2, 8];
const array2 = [-3, 4, 1, 7];

// Bools([a, b, c]).OR([e, f, g], fn) => (fn(a,e)) || (fn(b,f)) || (fn(c,g))
const result = Bools(array1).OR(array2, (a,b) => a < b);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **OR_ALL**

ORs all elements of the given array (& optional argument)

```js
import Bools from "array-slayer/booleans.js";

const array = [1, 2, 3, 0];

// Bools([a, b, c]).OR_ALL(bool) => (a || bool) && (b || bool) && (c || bool)
const result = Bools(array).OR_ALL();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

#### **OR_AND**

ANDs all elements of the given array & ORs the result with  an optional argument

```js
import Bools from "array-slayer/booleans.js";

const flag = true;
const array = [1, 2, 3, 0];

// Bools([a, b, c]).OR_AND(bool) => (a || bool) && (b || bool) && (c || bool)
const result = Bools(array).OR_AND(flag);
console.log(result); // -> true
```

#### **XOR_ALL**

XORs all elements of the given array (& optional argument)

```js
import Bools from "array-slayer/booleans.js";

const array = [1, 2, 3, 0];

const result = Bools(array).XOR_ALL();
console.log(result); // -> 0
```

**[⬆ back to top](#quick-links)**

## chunk

```js
import { chunk } from "array-slayer/chunk.js";

const array = [1,2,9,7,8,6,2,6,2,7];
const result = chunk(3, array);
console.log(result); // -> [ [ 1, 2, 9 ], [ 7, 8, 6 ], [ 2, 6, 2 ], [ 7 ] ]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1,2,9,7,8,6,2,6,2];
const result = ArraySlayer(array).chunk(3).value;
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
import ArraySlayer from "array-slayer";

const array = [1,2,9,7,8,6,2,6,2];
const result = ArraySlayer(array).clear().value;
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
import ArraySlayer from "array-slayer";

const array = [1,2,9,7,8,6,2,6,2];
const result = ArraySlayer(array).clearByIndexes(0, 2, 3).value;
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
import ArraySlayer from "array-slayer";

const array = [4, {id: 12}, "str", {c: [8, {d: "name"}] }, 24];
const result = ArraySlayer(array).clearByValues("str", { c: [8, {d: "name"}] }).value;
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
import ArraySlayer from "array-slayer";

const array = [
    [4, {id: 1}, "baz", {c: [8, {d: "foo"}], f: { e: 5 } }, 24],
    [4, {id: 2}, "foo", {c: [8, {d: "bar"}], f: { e: 6 } }, 24],
    [4, {id: 3}, "bar", {c: [8, {d: "baz"}], f: { e: 7 } }, 24]
];
const result = ArraySlayer(array).column(3, "f.e").value;
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
const result = count([4,5,6], array);
console.log(result); // -> 1
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1,2,1,5,1,8];
const result = ArraySlayer(array).count(1);
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
import ArraySlayer from "array-slayer";

const array = [5,6,8,4,1];
const result = ArraySlayer(array).deleteByIndexes(0, 2, 3).value;
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
import ArraySlayer from "array-slayer";

const array = [5,6,8,4,1];
const result = ArraySlayer(array).deleteByValues(5, 8, 4).value;
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
import ArraySlayer from "array-slayer";

const array1 = [5,6,8,4,1];
const array2 = [7,8,9,5,3];
const result = ArraySlayer(array1).difference(array2).value;
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
import ArraySlayer from "array-slayer";

const array = [5,6,5,5,1,7,8,5];
const result = ArraySlayer(array).findAllOccurences(5).value;
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
import ArraySlayer from "array-slayer";

const array = [5,6,5,5,1,7,8,5];
const result = ArraySlayer(array).findDuplicates(array).value;
console.log(result); // -> [5]
```

**[⬆ back to top](#quick-links)**

## get

#### **getTruthyValues**

```js
import { getTruthyValues } from "array-slayer/get.js";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = getTruthyValues(array);
console.log(result); // -> [4, true, 1, "", "name", {}, [], f()];
```

or

```js
import ArraySlayer from "array-slayer";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = ArraySlayer(array).getTruthyValues(array).value;
console.log(result); // -> [4, true, 1, "", "name", {}, [], f()];
```

**[⬆ back to top](#quick-links)**

#### **getFalsyValues**

```js
import { getFalsyValues } from "array-slayer/get.js";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = getFalsyValues(array);
console.log(result); // -> [false, 0];
```

or

```js
import ArraySlayer from "array-slayer";

const array = [4, true, false, 0, 1, "", "name", {}, [], function(){}];
const result = ArraySlayer(array).getFalsyValues(array).value;
console.log(result); // -> [false, 0];
```

**[⬆ back to top](#quick-links)**

#### **getAllKeys**

```js
import { getAllKeys } from "array-slayer/get.js";

const array = [{id: 12, name: "foo", lastName: "bar"}];
const result = getAllKeys(array[0]);
console.log(result); // -> ["id", "name", "foo", "lastName"];
```

or

```js
import ArraySlayer from "array-slayer";

const array = [{id: 12, name: "foo", lastName: "bar"}];
const result = ArraySlayer(array).getAllKeys(array[0]).value;
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
import ArraySlayer from "array-slayer";

const array = [{id: 12, name: "foo", lastName: "bar"}];
const result = ArraySlayer(array).has({id: 12, name: "foo", lastName: "bar"});
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasAll**

```js
import { hasAll } from "array-slayer/has.js";

const array = [1,2,3,4,5];
const result = hasAll(array, [2,4,5]);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1,2,3,4,5];
const result = ArraySlayer(array).hasAll([2,4,5]);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasAllTypes**

```js
import { hasAllTypes } from "array-slayer/has.js";

const array = ["foo",false,3,4,5];
const result = hasAllTypes(array, ["string", "boolean", "number"]);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = ["foo",false,3,4,5];
const result = ArraySlayer(array).hasAllTypes(["string", "boolean", "number"]);
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasArray**

```js
import { hasArray } from "array-slayer/has.js";

const array = ["foo", false, {id: 2}, 4, [1, {name: "foo"}],5];
const result = hasArray(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [[],false,3,4,5];
const result = ArraySlayer(array).hasArray();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasBoolean**

```js
import { hasBoolean } from "array-slayer/has.js";

const array = ["foo", false, {id: 2}, 4, [1, {name: "foo"}],5];
const result = hasBoolean(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [[],false,3,4,5];
const result = ArraySlayer(array).hasBoolean();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasDuplicates**

returns true if array has duplicate values

```js
import { hasDuplicates } from "array-slayer/has.js";

const array = [[],false,3,3,3];
const result = hasDuplicates(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [{id: 12},{id: 12},3,4,5];
const result = ArraySlayer(array).hasDuplicates();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasEmptyArr**

returns true if array includes an empty array ([]) // depth = 1

```js
import { hasEmptyArr } from "array-slayer/has.js";

const array = [[],false,3,3,3];
const result = hasEmptyArr(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [{id: 12},[18],3,4,5];
const result = ArraySlayer(array).hasEmptyArr();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

#### **hasEmptyObj**

returns true if array includes an empty object ({}) // depth = 1

```js
import { hasEmptyObj } from "array-slayer/has.js";

const array = [[],{},3,3,3];
const result = hasEmptyObj(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [{id: 12},[18],3,4,5];
const result = ArraySlayer(array).hasEmptyObj();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

#### **hasFalse**

returns true if array includes `false` boolean

```js
import { hasFalse } from "array-slayer/has.js";

const array = [[],{},3,false,3];
const result = hasFalse(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [[],{},0,null,undefined];
const result = ArraySlayer(array).hasFalse();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

#### **hasFalsy**

returns true if array includes a falsy value (`0`, `null`, `undefined`, `false`, ...)

```js
import { hasFalsy } from "array-slayer/has.js";

const array = [[],{},3,0,3];
const result = hasFalsy(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [[],{},1,null,5];
const result = ArraySlayer(array).hasFalsy();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasNaN**

returns true if array includes a `NaN`

```js
import { hasNaN } from "array-slayer/has.js";

const array = [[],{},0, null, undefined, false];
const result = hasNaN(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,1,null,5];
const result = ArraySlayer(array).hasNaN();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasNull**

returns true if array includes `Null`

```js
import { hasNull } from "array-slayer/has.js";

const array = [[],{},0, NaN, undefined, false];
const result = hasNull(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,1,null,5];
const result = ArraySlayer(array).hasNull();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasNullish**

returns true if array includes `null` or `undefined`

```js
import { hasNullish } from "array-slayer/has.js";

const array = [[],{},0, NaN, undefined, false];
const result = hasNullish(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,1,undefined,5];
const result = ArraySlayer(array).hasNullish();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasNumber**

returns true if array includes an item of type `"number"`

```js
import { hasNumber } from "array-slayer/has.js";

const array = [[],{},function(){}, null, undefined, false];
const result = hasNumber(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,1,undefined,5];
const result = ArraySlayer(array).hasNumber();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasObject**

returns true if array includes an Object

```js
import { hasObject } from "array-slayer/has.js";

const array = [1, 5, null, undefined, false];
const result = hasObject(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,1,{id: "foo"},5];
const result = ArraySlayer(array).hasObject();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasString**

returns true if array includes an item of type `"string"`

```js
import { hasString } from "array-slayer/has.js";

const array = [1, 5, null, {id: "foo"}, false];
const result = hasString(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,1,"foo",5];
const result = ArraySlayer(array).hasString();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasTrue**

returns true if array includes a `true` boolean

```js
import { hasTrue } from "array-slayer/has.js";

const array = [1, 5, null, undefined, false];
const result = hasTrue(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,1,true,5];
const result = ArraySlayer(array).hasTrue();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **hasTruthy**

returns true if array includes a truthy value

```js
import { hasTruthy } from "array-slayer/has.js";

const array = [1, 5, null, undefined, false];
const result = hasTruthy(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,null,undefined,false];
const result = ArraySlayer(array).hasTruthy();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

#### **hasUndefined**

returns true if array includes `undefined`

```js
import { hasUndefined } from "array-slayer/has.js";

const array = [1, 5, null, undefined, false];
const result = hasUndefined(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array = [0,NaN,null,"", [], {},false];
const result = ArraySlayer(array).hasUndefined();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

## interpolate

Linear Interpolation

A -> a

B -> x = ?

C -> c

array1 = [A, B, C]

array2= [a, "x", c]

x = interpolate(array1, array2);

initial value for `x` can be set to either `"x"`, `"X"`, `"?"`, `null`, `false` or `undefined`

```js
import { interpolate } from "array-slayer/interpolate.js";

const array1 = [1,2,3];
const array2 = [2,"?",6];
const result = interpolate(array1, array2);
console.log(result); // -> 4
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1,2,3]).interpolate([2, undefined, 6])
console.log(result); // -> 4
```

**[⬆ back to top](#quick-links)**

## intersection

returns the common elements between two or more arrays (A ∩ B ∩ C ...)

```js
import { intersection } from "array-slayer/intersection.js";

const array1 = [1,2,3];
const array2 = [2,3,6];
const array3 = [3,4,5];
const result = intersection(array1, array2, array3);
console.log(result); // -> [3]
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1,2,3]).intersection([2,3,6], [3,4,5]).value;
console.log(result); // -> [3]
```

**[⬆ back to top](#quick-links)**

## is

#### **isEmpty**

returns true if `array.length === 0`;

```js
import { isEmpty } from "array-slayer/isEmpty.js";

const array = [4, 5, 6];
const result = isEmpty(array);
console.log(result); // -> false
```

or

```js
import ArraySlayer from "array-slayer";

const array = [];
const result = ArraySlayer(array).isEmpty();
console.log(result); // -> true
```

**[⬆ back to top](#quick-links)**

#### **isEqual**

returns true if two arrays have the same elements in the same order (using `JSON.stringify` for comparison)

```js
import { isEqual } from "array-slayer/isEqual.js";

const array1 = [4, false, {id: "foo"}];
const array2 = [4, false, {id: "foo"}];
const result = isEqual(array1, array2);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array1 = [4, false, {id: "foo"}];
const array2 = [4, false, {id: "bar"}];
const result = ArraySlayer(array1).isEqual(array2);
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

#### **isUnique**

returns true if an array does not have repetetive items

```js
import { isUnique } from "array-slayer/isUnique.js";

const array = [4, false, {id: "foo"}];
const result = isUnique(array);
console.log(result); // -> true
```

or

```js
import ArraySlayer from "array-slayer";

const array2 = [4, {id: "bar"}, {id: "bar"}];
const result = ArraySlayer(array1).isUnique();
console.log(result); // -> false
```

**[⬆ back to top](#quick-links)**

## math

#### **max**

returns the maximum value in array(s)

```js
import { max } from "array-slayer/max.js";

const result1 = max([ 1, 3, 7, 5 ]);
console.log(result1); // -> 7
const result2 = max(1, 3, 7, 5);
console.log(result2); // -> 7
const result3 = max([ 1, 3, 7, 5], [4, 6, [11, 0], 10], [7, 2]);
console.log(result3); // -> 11
```

or

```js
import ArraySlayer from "array-slayer";

const result1 = ArraySlayer([1, 2, 3]).max();
console.log(result1); // -> 3
const result2 = ArraySlayer([4, 6, 8, 10]).max([1, 3, 7, 5], [5, [0, 2, [11, 0]]]);
console.log(result2); // -> 11
```

**[⬆ back to top](#quick-links)**

#### **maxBy**

returns the maximum value of specific items in an array

```js
import { maxBy } from "array-slayer/maxBy.js";

const array = [
    { id: 1, amount: 12 },
    { id: 2, amount: 18 },
    { id: 3, amount: 14 },
];
const result = maxBy(array, item => item.amount);
console.log(result); // -> 18
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    { id: 1, amount: 12 },
    { id: 2, amount: 18 },
    { id: 3, amount: 14 },
];
const result = ArraySlayer(array).maxBy(item => item.amount);
console.log(result); // -> 18
```

**[⬆ back to top](#quick-links)**

#### **maxOf**

returns the maximum value of specific items in an array

```js
import { maxOf } from "array-slayer/maxOf.js";

const array = [
    [1, "foo", { id: 1, amount: { value: 12 } }, 15],
    [1, "foo", { id: 1, amount: { value: 14 } }, 15],
    [1, "foo", { id: 1, amount: { value: 18 } }, 15],
];
const result = maxOf(array, "2.amount.value");
console.log(result); // -> 18
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    [1, "foo", { id: 1, amount: { value: 12 } }, 15],
    [1, "foo", { id: 1, amount: { value: 14 } }, 15],
    [1, "foo", { id: 1, amount: { value: 18 } }, 15],
];
const result = ArraySlayer(array).maxOf("2.amount.value");
console.log(result); // -> 18
```

**[⬆ back to top](#quick-links)**

#### **mean**

returns the mean value in an array

```js
import { mean } from "array-slayer/mean.js";

const result = mean([ 2, 4, -2, 7, 4 ]);
console.log(result); // -> 5
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([ 2, 4, -2, 7, 4 ]).mean();
console.log(result); // -> 5
```

**[⬆ back to top](#quick-links)**

#### **meanOf**

returns the mean value of specific items in an array

```js
import { meanOf } from "array-slayer/meanOf.js";

const array = [
    [1, "foo", { id: 1, amount: { value: 12 } }, 15],
    [1, "foo", { id: 1, amount: { value: 16 } }, 15],
];
const result = meanOf(array, "2.amount.value");
console.log(result); // -> 14
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    [1, "foo", { id: 1, amount: { value: 12 } }, 15],
    [1, "foo", { id: 1, amount: { value: 16 } }, 15],
];
const result = ArraySlayer(array).meanOf("2.amount.value");
console.log(result); // -> 14
```

**[⬆ back to top](#quick-links)**

#### **min**

returns the minimum value in array(s)

```js
import { min } from "array-slayer/min.js";

const result1 = min([ 1, 3, 7, 5 ]);
console.log(result1); // -> 1
const result2 = min(1, 3, 7, 5);
console.log(result2); // -> 1
const result3 = min([ 1, 3, 7, 5], [4, 6, [11, 0], 10], [7, 2]);
console.log(result3); // -> 0
```

or

```js
import ArraySlayer from "array-slayer";

const result1 = ArraySlayer([1, 2, 3]).min();
console.log(result1); // -> 1
const result2 = ArraySlayer([4, 6, 8, 10]).min([1, 3, 7, 5], [5, [0, 2, [11, 0]]]);
console.log(result2); // -> 0
```

**[⬆ back to top](#quick-links)**

#### **minBy**

returns the minimum value of specific items in an array

```js
import { minBy } from "array-slayer/minBy.js";

const array = [
    { id: 1, amount: 12 },
    { id: 2, amount: 18 },
    { id: 3, amount: 14 },
];
const result = minBy(array, item => item.amount);
console.log(result); // -> 12
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    { id: 1, amount: 12 },
    { id: 2, amount: 18 },
    { id: 3, amount: 14 },
];
const result = ArraySlayer(array).maxBy(item => item.amount);
console.log(result); // -> 12
```

**[⬆ back to top](#quick-links)**

#### **minOf**

returns the minimum value of specific items in an array

```js
import { minOf } from "array-slayer/minOf.js";

const array = [
    [1, "foo", { id: 1, amount: { value: 12 } }, 15],
    [1, "foo", { id: 1, amount: { value: 14 } }, 15],
    [1, "foo", { id: 1, amount: { value: 18 } }, 15],
];
const result = minOf(array, "2.amount.value");
console.log(result); // -> 12
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    [1, "foo", { id: 1, amount: { value: 12 } }, 15],
    [1, "foo", { id: 1, amount: { value: 14 } }, 15],
    [1, "foo", { id: 1, amount: { value: 18 } }, 15],
];
const result = ArraySlayer(array).minOf("2.amount.value");
console.log(result); // -> 12
```

**[⬆ back to top](#quick-links)**

#### **product**

returns the product of values in an array

```js
import { product } from "array-slayer/product.js";

const result = product([ 1, 2, 3 ]);
console.log(result); // -> 6
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1, 2, 3]).product();
console.log(result); // -> 6
```

**[⬆ back to top](#quick-links)**

#### **productOf**

returns the product of specific values in an array

```js
import { productOf } from "array-slayer/productOf.js";

const array = [
    [1, "foo", { id: 1, amount: { value: 2 } }, 15],
    [1, "foo", { id: 1, amount: { value: 3 } }, 15],
    [1, "foo", { id: 1, amount: { value: 4 } }, 15],
];
const result = productOf(array, "2.amount.value");
console.log(result); // -> 24
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    [1, "foo", { id: 1, amount: { value: 2 } }, 15],
    [1, "foo", { id: 1, amount: { value: 3 } }, 15],
    [1, "foo", { id: 1, amount: { value: 4 } }, 15],
];
const result = ArraySlayer(array).productOf("2.amount.value");
console.log(result); // -> 24
```

**[⬆ back to top](#quick-links)**

#### **sum**

returns the sum of values in an array

```js
import { sum } from "array-slayer/sum.js";

const result = sum([ 1, 3, 7, 5 ]);
console.log(result); // -> 16
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1, 2, 3]).sum();
console.log(result); // -> 6
```

**[⬆ back to top](#quick-links)**

#### **sumOf**

returns the sum of specific values in an array

```js
import { sumOf } from "array-slayer/sumOf.js";

const array = [
    [1, "foo", { id: 1, amount: { value: 2 } }, 15],
    [1, "foo", { id: 1, amount: { value: 3 } }, 15],
    [1, "foo", { id: 1, amount: { value: 4 } }, 15],
];
const result = sumOf(array, "2.amount.value");
console.log(result); // -> 9
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    [1, "foo", { id: 1, amount: { value: 2 } }, 15],
    [1, "foo", { id: 1, amount: { value: 3 } }, 15],
    [1, "foo", { id: 1, amount: { value: 4 } }, 15],
];
const result = ArraySlayer(array).sumOf("2.amount.value");
console.log(result); // -> 9
```

**[⬆ back to top](#quick-links)**

## matrix

#### **dotProduct**

returns the dot-product of two arrays

```js
import { dotProduct } from "array-slayer/matrix.js";

const array1 = [1,2,3];
const array2 = [2,3,6];
const result = dotProduct(array1, array2);
console.log(result); // -> 26    // which is 1*2 + 2*3 + 3*6 
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1,2,3]).dotProduct([2,3,6]);
console.log(result); // -> 26
```

**[⬆ back to top](#quick-links)**

#### **crossProduct**

returns the cross-product of two arrays (as vectors of 1 to 3 elements)

```js
import { crossProduct } from "array-slayer/matrix.js";

const array1 = [1,2,3];
const array2 = [2,3,6];
const result = crossProduct(array1, array2);
console.log(result); // -> 40
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1,2,3]).crossProduct([2,3,6]);
console.log(result); // -> 40
```

**[⬆ back to top](#quick-links)**

## random

returns a random element from an array

```js
import { random } from "array-slayer/random.js";

const result = random([1,2,3]);
console.log(result); // -> returns an accidental number form array (one of: 1, 2 or 3)
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1,2,3]).random();
```

**[⬆ back to top](#quick-links)**

## range

returns an array of consecutive numbers starting from the first argument & ending to the last argument (start & end are included)

```js
import { range } from "array-slayer/range.js";

const result1 = range(5,8);
console.log(result1); // -> [5, 6, 7, 8]
const result2 = range(5);
console.log(result3); // -> [0, 1, 2, 3, 4, 5]
```

or

```js
import ArraySlayer from "array-slayer";

const result1 = ArraySlayer([]).range(5, 8);
console.log(result1); // -> [5, 6, 7, 8]
const result2 = ArraySlayer([]).range(5);
console.log(result2); // -> [0, 1, 2, 3, 4, 5]
```

**[⬆ back to top](#quick-links)**

## readOnly

returns a readOnly copy of the given array

```js
import { readOnly } from "array-slayer/readOnly.js";

const array = [1, 2, 3, 4, 5];
const arr = readOnly(array);
arr.pop(); // -> TypeError: Cannot delete property '4' of [object Array]
```

when importing from `array-slayer`, this method does not return a readOnly copy of the array, but changes the original array to a readOnly array; so that further methods chained that manipulate the array, will throw Error.

```js
import ArraySlayer from "array-slayer";

const array = [1, 2, 3, 4, 5];
const arr = ArraySlayer(array).readOnly().deleteByIndexes(2).value // -> throws Error
```

**[⬆ back to top](#quick-links)**

## replace

#### **replaceByIndex**

replaces an array item using the given array index

```js
import { replaceByIndex } from "array-slayer/replace.js";

const array = [5, 6, 8, 4, 1];
const result = replaceByIndex(array, 2, 700);
console.log(result); // -> [5, 6, 700, 4, 1]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 1];
const result = ArraySlayer(array).replaceByIndex(2, 700).value;
console.log(result); // -> [5, 6, 700, 4, 1]
```

**[⬆ back to top](#quick-links)**

#### **replaceByIndexes**

similar to `replaceByIndex` replaces array items using the given array indexes (takes arrays of indexes & replace values instead of a single index & value).

> **NOTE:** `replaceByIndexes` can also do what `replaceByIndex` does, but if you want to replace a single item in an array, we recommend to use `replaceByIndex` for performance reasons.

```js
import { replaceByIndexes } from "array-slayer/replace.js";

const array = [5, 6, 8, 4, 1];
const result = replaceByIndexes(array, [2, 4], [700, 900]);
console.log(result); // -> [5, 6, 700, 4, 900]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 1];
const result = ArraySlayer(array).replaceByIndexes([2, 4], [700, 900]).value;
console.log(result); // -> [5, 6, 700, 4, 900]
```

**[⬆ back to top](#quick-links)**

#### **replaceByValue**

replaces an array item using the given value

```js
import { replaceByValue } from "array-slayer/replace.js";

const array = [5, 6, 8, 4, 1];
const result = replaceByValue(array, 6, 500);
console.log(result); // -> [5, 500, 8, 4, 1]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 1];
const result = ArraySlayer(array).replaceByValue(6, 500).value;
console.log(result); // -> [5, 500, 8, 4, 1]
```

**[⬆ back to top](#quick-links)**

#### **replaceByValues**

similar to `replaceByValue` replaces array items using the given array indexes (takes arrays of indexes & replace values instead of a single index & value).

> **NOTE:** `replaceByValues` can also do what `replaceByValue` does, but if you want to replace a single item in an array, we recommend to use `replaceByValue` for performance reasons.

```js
import { replaceByValues } from "array-slayer/replace.js";

const array = [5, 6, 8, 4, 1];
const result = replaceByValues(array, [8, 1], [700, 900]);
console.log(result); // -> [5, 6, 700, 4, 900]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 1];
const result = ArraySlayer(array).replaceByValues([8, 1], [700, 900]).value;
console.log(result); // -> [5, 6, 700, 4, 900]
```

**[⬆ back to top](#quick-links)**

## reverse

reverses the array items from last to first

```js
import { reverse } from "array-slayer/reverse.js";

const array = [5, 6, 8, 4, 1];
const result = reverse(array);
console.log(result); // -> [1, 4, 8, 6, 5]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 1];
const result = ArraySlayer(array).reverse().value;
console.log(result); // -> [1, 4, 8, 6, 5]
```

**[⬆ back to top](#quick-links)**

## rotate

rotates the array items by the given number of rotations & direction (default = `"clockwise"`)

```js
import { rotate } from "array-slayer/rotate.js";

const array = [5, 6, 8, 4, 2];
const result1 = rotate(array, 1);
console.log(result1); // -> [2, 5, 6, 8, 4]
const result2 = rotate(array, 2, "counterclockwise");
console.log(result2); // -> [8, 4, 2, 5, 6]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 2];
const result1 = ArraySlayer(array).rotate(1).value;
console.log(result2); // -> [2, 5, 6, 8, 4]
const result1 = ArraySlayer(array).rotate(2, "counterclockwise").value;
console.log(result2); // -> [8, 4, 2, 5, 6]
```

**[⬆ back to top](#quick-links)**

## shuffle

shuffles (sorts randomly) the array items by the Modern Fisher-Yates Algorithm

```js
import { shuffle } from "array-slayer/shuffle.js";

const array = [5, 6, 8, 4, 2];
const result1 = shuffle(array);
console.log(result1); // -> exapmle output: [4, 5, 6, 2, 8]
const result2 = shuffle(array);
console.log(result2); // -> exapmle output: [6, 5, 8, 2, 4]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 2];
const result1 = ArraySlayer(array).shuffle().value;
console.log(result2); // -> exapmle output: [2, 8, 4, 5, 6]
const result1 = ArraySlayer(array).shuffle().value;
console.log(result2); // -> exapmle output: [5, 2, 8, 6, 4]
```

**[⬆ back to top](#quick-links)**

## sort

sorts the array items based on the given conditions & function

order: "ascending" (default) | "descending"

sortType: "QuickSort" (default) | "MergeSort" | "InsertionSort" | "BubbleSort" | "RadixSort" | "HeapSort"

```js
import { sort } from "array-slayer/sort.js";

const array = [5, 6, 8, 4, 2];
const result = sort(array, { sortType = "InsertionSort" });
console.log(result); // -> [2, 4, 5, 6, 8]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    { id: 14, value: "a" },
    { id: 11, value: "d" },
    { id: 12, value: "c" },
];
const result1 = ArraySlayer(array).sort({ order: "descending", sortBy: item => item.id }).value;
console.log(result2); // -> [
                      //     { id: 14, value: "a" },
                      //     { id: 12, value: "c" },
                      //     { id: 11, value: "d" },
                      //    ]
```

**[⬆ back to top](#quick-links)**

## swap

#### **swapByIndexes**

swaps two values in an array using the given indexes of those values

```js
import { swapByIndexes } from "array-slayer/swap.js";

const array = [5, 6, 8, 4, 1];
const result = swapByIndexes(array, 1, 2);
console.log(result); // -> [5, 8, 6, 4, 1]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 1];
const result = ArraySlayer(array).swapByIndexes(0, 3).value;
console.log(result); // -> [4, 6, 8, 5, 1]
```

**[⬆ back to top](#quick-links)**

#### **swapByValues**

swaps two values in an array using the target values

```js
import { swapByValues } from "array-slayer/swap.js";

const array = [5, 6, 8, 4, 1];
const result = swapByValues(array, 6, 8);
console.log(result); // -> [5, 8, 6, 4, 1]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [5, 6, 8, 4, 1];
const result = ArraySlayer(array).swapByValues(5, 4).value;
console.log(result); // -> [4, 6, 8, 5, 1]
```

**[⬆ back to top](#quick-links)**

## symmetricDifference

returns the symmetric difference of two arrays:

> (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B)

```js
import { symmetricDifference } from "array-slayer/symmetricDifference.js";

const A = [5, 6, 8, 4, 1];
const B = [4, 5, 7, 1, 9];
const result = symmetricDifference(A, B);
console.log(result); // -> [6, 8]
```

or

```js
import ArraySlayer from "array-slayer";

const A = [5, 6, 8, 4, 1];
const B = [4, 5, 7, 1, 9];
const result = ArraySlayer(A).symmetricDifference(B).value;
console.log(result); // -> [6, 8]
```

**[⬆ back to top](#quick-links)**

## take

takes a slice of the array with the given array size & starting from the given index (default = 0)

```js
import { take } from "array-slayer/take.js";

const array = [1, 8, 3, 9, 5, 6, 7, 8, 9, 7];
const result = take(array, 5, 2);
console.log(result); // -> [3, 9, 5, 6, 7]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1, 8, 3, 9, 5, 6, 7, 8, 9, 7];
const result = ArraySlayer(array).take(4).value;
console.log(result); // -> [1, 8, 3, 9]
```

**[⬆ back to top](#quick-links)**

## toJSONObject

takes two arrays for creating a json object: first array for representing the object keys & the second one as their respective values

```js
import { toJSONObject } from "array-slayer/toJSONObject.js";

const keys = ["id", "user", "orderAmount", "date"];
const values = [12, "foo", 500, "2021-07-05"];
const result = toJSONObject(keys, values);
console.log(result); // -> {
                     //        id: 12,
                     //        user: "foo",
                     //        orderAmount: 500,
                     //        date: "2021-07-05"
                     //    }
```

or

```js
import ArraySlayer from "array-slayer";

const keys = ["id", "user", "orderAmount", "date"];
const values = [12, "foo", 500, "2021-07-05"];
const result = ArraySlayer([]).toJSONObject(keys, values);
console.log(result); // -> {
                     //        id: 12,
                     //        user: "foo",
                     //        orderAmount: 500,
                     //        date: "2021-07-05"
                     //    }
```

**[⬆ back to top](#quick-links)**

## types

returns the types of items in an array

```js
import { types } from "array-slayer/types.js";

const array = [15, false, {id: 115}, true, 18, 19, null];
const result = types(array);
console.log(result); // -> ["number", "boolean", "object"]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [15, false, {id: 115}, true, 18, 19, null];
const result = ArraySlayer(array).types().value;
console.log(result); // -> ["number", "boolean", "object"]
```

**[⬆ back to top](#quick-links)**

## union

returns the union of elements in two or more arrays (A ∪ B ∪ C ...)

```js
import { union } from "array-slayer/union.js";

const array1 = [1,2,3];
const array2 = [2,3,6];
const array3 = [3,4,5];
const result = union(array1, array2, array3);
console.log(result); // -> [1, 2, 3, 4, 5, 6]
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1,2,3]).union([2,3,6], [3,4,5]).value;
console.log(result); // -> [1, 2, 3, 4, 5, 6]
```

**[⬆ back to top](#quick-links)**

## unique

#### **unique**

removes repetetive items in an array, returning an array of unique items

```js
import { unique } from "array-slayer/unique.js";

const array = [1, 2, 3, 2, 3, 3, 5, 1, 3, 5, 1, 2];
const result = unique(array);
console.log(result); // -> [1, 2, 3, 5]
```

or

```js
import ArraySlayer from "array-slayer";

const result = ArraySlayer([1, 2, 3, 2, 3, 3, 5, 1, 3, 5, 1, 2]).unique().value;
console.log(result); // -> [1, 2, 3, 5]
```

**[⬆ back to top](#quick-links)**

#### **uniqueBy**

returns an array of items in which specific items in array are unique

```js
import { uniqueBy } from "array-slayer/uniqueBy.js";

const array = [
    { id: 1, amount: 12 },
    { id: 2, amount: 12 },
    { id: 3, amount: 14 },
];
const result = uniqueBy(array, item => item.amount);
console.log(result); // -> [{ id: 3, amount: 14 }]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [
    { id: 1, amount: 12 },
    { id: 2, amount: 12 },
    { id: 3, amount: 14 },
];
const result = ArraySlayer(array).uniqueBy(item => item.amount);
console.log(result); // -> [{ id: 3, amount: 14 }]
```

**[⬆ back to top](#quick-links)**

## x

the `x` methods do a similar job as their native js counterparts except they return the resulting array instead of the manipulated item(s)

#### **xpop**

returns a copy of the array without the last element

```js
import { xpop } from "array-slayer/x.js";

const array = [1, 2, 3, 4];
const result = xpop(array);
console.log(result); // -> [1, 2, 3]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1, 2, 3, 4];
const result = ArraySlayer(array).xpop();
console.log(result); // -> [1, 2, 3]
```

**[⬆ back to top](#quick-links)**

#### **xpush**

returns a copy of the array with extra last element(s)

```js
import { xpush } from "array-slayer/x.js";

const array = [1, 2, 3, 4];
const result = xpush(array, 5);
console.log(result); // -> [1, 2, 3, 4, 5]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1, 2, 3, 4];
const result = ArraySlayer(array).xpush(5, 6, 7);
console.log(result); // -> [1, 2, 3, 4, 5, 6, 7]
```

**[⬆ back to top](#quick-links)**

#### **xshift**

returns a copy of the array without the first element

```js
import { xshift } from "array-slayer/x.js";

const array = [1, 2, 3, 4];
const result = xshift(array);
console.log(result); // -> [2, 3, 4]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1, 2, 3, 4];
const result = ArraySlayer(array).xshift();
console.log(result); // -> [2, 3, 4]
```

**[⬆ back to top](#quick-links)**

#### **xunshift**

returns a copy of the array with extra first element(s)

```js
import { xunshift } from "array-slayer/x.js";

const array = [1, 2, 3, 4];
const result = xunshift(array, 9, 8, 7);
console.log(result); // -> [9, 8, 7, 1, 2, 3, 4]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [1, 2, 3, 4];
const result = ArraySlayer(array).xunshift(8);
console.log(result); // -> [8, 1, 2, 3, 4]
```

**[⬆ back to top](#quick-links)**

#### **xsplice**

similar to the splice method of javascript, but returns the resulting array instead of spliced items

```js
import { xsplice } from "array-slayer/x.js";

const array = [7, 8, 9, 1, 2, 3, 4];
const result = xsplice(array, 1, 1, 5) // (arr, targetIndex, howManyToRemove = 0, ...newItems)
console.log(result); // -> [7, 5, 9, 1, 2, 3, 4]
```

or

```js
import ArraySlayer from "array-slayer";

const array = [7, 8, 9, 1, 2, 3, 4];
const result = ArraySlayer(array).xsplice(1, 1, 5);
console.log(result); // -> [7, 5, 9, 1, 2, 3, 4]
```

**[⬆ back to top](#quick-links)**

## zip

#### **zip**

creates an array of grouped elements from the given arrays of the same lengths as arguments. (grouping is based on indexes)

```js
import { zip } from "array-slayer/zip.js";

const array1 = [7, 8, 9];
const array2 = [1, 2, 3];
const array3 = [5, 4, 8];
const result = zip(array1, array2, array3)
console.log(result); // -> [ [7, 1, 5], [8, 2, 4], [9, 3, 8] ]
```

or

```js
import ArraySlayer from "array-slayer";

const array1 = [7, 8, 9];
const array2 = [1, 2, 3];
const result = ArraySlayer(array1).zip(array2).value;
console.log(result); // -> [ [7, 1], [8, 2], [9, 3] ]
```

**[⬆ back to top](#quick-links)**

#### **unzip**

```js
import { unzip } from "array-slayer/zip.js";

const zipped = [ [7, 1, 5], [8, 2, 4], [9, 3, 8] ];
const result = unzip(zipped)
console.log(result); // -> [ [7, 8, 9], [1, 2, 3], [5, 4, 8] ]
```

or

```js
import ArraySlayer from "array-slayer";

const zipped = [ [7, 1, 5], [8, 2, 4], [9, 3, 8] ];
const result = ArraySlayer(zipped).unzip().value;
console.log(result); // -> [ [7, 8, 9], [1, 2, 3], [5, 4, 8] ]
```

**[⬆ back to top](#quick-links)**

## Specific Chain Methods

The following methods are specific to the main bundle & irrelevant to the methods one imports as modules. You can only use these whenever you import the default lib from `"array-slayer"`.

### **Native JS Methods**

The default import supports chaining array-slayer specific methods with all javascript's native array methods such as: `concat`, `slice`, `map`, `filter`, etc. You can chain any javascript array method with array-slayer methods.

Example:
```js
import ArraySlayer from "array-slayer";

const array = [7, 8, 9];
const result1 = ArraySlayer(array).map(num => num + 2).includes(10); // -> true
const result2 = ArraySlayer(array).concat([1, 2, 3]).sum(); // -> 30 
```

**[⬆ back to top](#specific-chain-methods)**

### **deepCopy**

array-slayer's default deepCopy method is just a simple daily implemention by many programmers which loses non-JSON-serializable data:

```js
const deepCopy = (obj) => JSON.parse(JSON.stringify(obj));
```

However, you can change this by providing your own deepCopy function to array-slayer's configuration. (see [Advanced Configuration](#advanced-configuration))

Example Usage:

```js
import ArraySlayer from "array-slayer";

const array = [12, { id: 2, order: { values: [1, 2, 5], amount: 200 } }];
const deeplyCopied = ArraySlayer(array).deepCopy().value;
deeplyCopied[1].order.values[2] = 7;
ArraySlayer(array).isEqual(deeplyCopied) // -> false
```

**[⬆ back to top](#specific-chain-methods)**

### **lastElement**

returns the last element of the array.

```js
import ArraySlayer from "array-slayer";

const lastItem = ArraySlayer([1, 2, 3, 4, 5]).lastElement;
console.log(lastItem); // -> 5
```

**[⬆ back to top](#specific-chain-methods)**

### **length**

returns the length of the array.

```js
import ArraySlayer from "array-slayer";

const length = ArraySlayer([1, 2, 3, 4, 5]).length;
console.log(length); // -> 5
```

**[⬆ back to top](#specific-chain-methods)**

### **mutate**

changes the array-slayer's refrence to the original array. All other methods chained after this method will mutate the original array in-place, so this method should be used carefully in order to avoid unpredictable behavior as it won't obey the immutability principle any more.

```js
import ArraySlayer from "array-slayer";

const array = [1, 2, 3, 4, 5];
const sameArray = ArraySlayer(array).mutate().value;
sameArray[1] = 9;
console.log(array);     // -> [1, 9, 3, 4, 5]
console.log(sameArray); // -> [1, 9, 3, 4, 5]
```

**[⬆ back to top](#specific-chain-methods)**

### **value**

Most array-slayer's methods return an object by default. In order to get the returning array at the end of the chain, one must chain `.value` at the end (*NOTE*: methods that return primitive types won't need this extra keyword).

```js
import ArraySlayer from "array-slayer";

const array = ArraySlayer([1, 2, 3, 4, 5]).value();
console.log(array); // -> [1, 2, 3, 4, 5]
```

**[⬆ back to top](#specific-chain-methods)**

## Advanced Configuration

array-slayer takes a second argument for custom user configuraions for `serialization` & `deepClone`. One can use it this way:

```js
import ArraySlayer from "array-slayer";

const slayer = arr => ArraySlayer(arr, {
    // the following are the default implementaions for array-slayer (you don't need any configuration if you want to define them as below):
    serialize: array => JSON.stringify(array),
    cloneDeep: array => JSON.parse(JSON.stringify(array))
});
```

### **configuring deepCopy**

one can set any custom deepCopy function for array-slayer's default deep cloning.

Example using `lodash.cloneDeep`:

```js
import ArraySlayer from "array-slayer";
import cloneDeep from "lodash.cloneDeep";

const slayer = arr => ArraySlayer(arr, { cloneDeep: cloneDeep });

const array = [12, { id: 2, order: { values: [1, 2, 5], amount: 200 } }];
const deeplyCopied = slayer(array).deepCopy().value;
```

**[⬆ back to top](#advanced-configuration)**

### **configuring serialization**

one can set any custom serialization function for array-slayer's default serialization.

Example using `serialize-javascript`:

```js
import ArraySlayer from "array-slayer";
import serialize from "serialize-javascript";

const slayer = arr => ArraySlayer(arr, { serialize: serialize });

const array = [12, { id: 2, order: { values: [1, 2, 5], amount: 200 } }];
const deeplyCopied = slayer(array).isEqual(array.slice()); // -> checks for equality using the serialize method from "serialize-javascript" instead of JSON.stringify which could lose non-JSON-serializable data in comparison
```

**[⬆ back to top](#advanced-configuration)**
____________________________________

## License

The [MIT License][license-url] (MIT)

&copy; 2021 Sina Khodabandehloo

[license-url]:  https://github.com/Sinakhx/array-slayer/blob/master/LICENSE