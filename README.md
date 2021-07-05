# array-slayer
## About
With the array-slayer utility library you have:

- smooth experice of functional programming tackling daily problems with arrays.
- faster development speed by letting array-slayer solve usual problems for you.
- much more readable & consice code for reviewing.

## Example usage
```js
import _ from "lib/src/arraySlayer.js";

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
import { sort } from "lib/src/fp/sort.js";

const result = sort(array, { sortType: "MergeSort", sortBy: item => item[3].c.d });

console.log(result); // returns sorted array based on the selected keys
```

## License

The [MIT License][license-url] (MIT)

&copy; 2021 Sina Khodabandehloo

[license-url]:  https://github.com/Sinakhx/array-slayer/blob/master/LICENSE