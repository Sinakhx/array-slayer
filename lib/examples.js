import Arr from "./src/arraySlayer.js";
import { chunk } from "./src/fp/chunk.js";
import { clear } from "./src/fp/clear.js";
import { count } from "./src/fp/count.js";
import { difference } from "./src/fp/difference.js";

const arr1 = [1,2,6,{a: 12, b: {c: "Foo"}}, 14, 14, 14, {a: 18, b: {c: "Foo"}}];

const arr2 = [
    [47,25,1,{ a: "Foo2", b: "Bar1", c: { d: "ct", e: { f: 9 }, g: 1 } }, [[800], [900, [1200, [622, 22], 555]]] ],
    [47,29,2,{ a: "Foo1", b: "Bar2", c: { d: "bg", e: { f: 5 }, g: 4 } }, [[801], [901, [1201, [650, 25], 560]]] ],
    [47,25,3,{ a: "Foo3", b: "Bar3", c: { d: "ce", e: { f: 7 }, g: 3 } }, [[802], [902, [1202, [622, 22], 570]]] ],
    [47,38,4,{ a: "Foo4", b: "Bar4", c: { d: "zd", e: { f: 1 }, g: 4 } }, [[803], [903, [1203, [650, 25], 580]]] ],
];

const arr3 = [
    [71,90,20,11,12],
    [72,91,50,30,13],
    [73,92,35,40,14],
    [74,93,86,50,15],
    [75,94,49,60,16],
]

/* (1) */
// const ex1 = Arr(arr1).count(14);
// console.log(ex1);

/* (2) */
// const ex2 = Arr(arr1);
// console.log(ex2.value);
// ex2.clear();
// console.log(ex2.value);
// console.log(arr1)

/* (3) */
// console.log(Arr(arr2).column(1).value);
// console.log(Arr(arr2).column(3, "a").value);
// console.log(Arr(arr2).column(3, "c.d").value);
// console.log(Arr(arr2).column(3, "c.e.f").value);
// console.log(Arr(arr2).column(item => item[3].c.e.f * 10).value);

// console.log(Arr(arr2).column(1).concat([77,77,77]));

// const col1 = Arr(arr2).column(1).entries();
// console.log(col1.next());
// console.log(col1.next());

// console.log(Arr(arr2).column(1).value);
// console.log(Arr(arr2).column(1).has(28));
// console.log(Arr(arr2).row(0).hasNullish());


// console.log(Arr(arr2).map(item => item[3].c.e.f));
// console.log(Arr(arr2).sumOf(item => item[3].c.e.f));
// console.log(Arr(arr2).sumOf("2"));
// console.log(Arr(arr2).sumOf("3.c.e.f"));
// console.log(Arr(arr2).productOf("3.c.e.f"));

// console.log(Arr(arr1).xunshift(70,80).value);
// console.log(Arr(arr1).xunshift(70,80).value);
// console.log(Arr(arr2).column(0).union([800], [900]).value);
// console.log(Arr(arr2).column(0).union([[800], [900, [1200, [622, 22], 555]]]).value);
// console.log(Arr(arr2).column(2).findAllOccurences(3).value);

// console.log(Arr(arr2).column(2).max());
// console.log(Arr(arr2).maxOf("2"));
// console.log(Arr(arr2).minOf("2"));
// console.log(Arr(arr2).maxOf("3.c.e.f"));
// console.log(Arr(arr2).maxBy(item => item[2]));
// console.log(Arr(arr2).maxBy("2"));
// console.log(Arr(arr2).maxBy("3.c.e.f"));
// console.log(Arr(arr2).minBy("3.c.e.f"));

// console.log(Arr(arr2).uniqueBy(item => item[1]).value);
// console.log(Arr(arr2).uniqueBy("3.c.g").value);
// console.log(Arr(arr2).column(1).types().isSingle());

// const vectorA = Arr(arr2).column(0);
// const vectorB = Arr(arr2).column(2);
// const vectorC = Arr(arr2).column(3, "c.e.f");
// const vectorC2 = Arr(arr2).column(item => item[3].c.e.f);
// console.log(vectorA.dotProduct(vectorB.value));
// console.log(vectorC2.xpop().crossProduct(vectorA.xpop().value));

// console.log(Arr([]).range(15).value);
// console.log(Arr([]).range(45,53).value);

// const r = Arr([1,2,3]).readOnly();
// r.push(50) // -> Error

// const arr = Arr(arr2).swapByIndexes(1,3).value;
// console.log(arr);

// const arr = Arr(arr2).swapByValues(arr2[0],arr2[1]).value;
// console.log(arr);

// const arr = Arr(arr2).delete(1,2);
// console.log(arr);

// const arr = Arr(arr2).clearByIndexes(0,1);
// console.log(arr);

// const arr = Arr(arr2).column(2);
// console.log(arr.value);
// console.log(arr.findAllOccurences(3));
// arr.clearByValues(2,4)
// arr.deleteByValues(2,4)
// arr.clearByIndexes(2,4)
// arr.deleteByIndexes(2,4);

// console.log(arr.value);
// arr.splice(0,1)
// console.log(arr.value);

// console.log(arr.value);
// console.log(arr.xsplice(0,1).value);
// console.log(Arr(arr2).column(2).value);
// console.log(arr.value);
// console.log(arr.xsplice(1,1).value);
// console.log(arr.splice(1,1).value);

// console.log(Arr(arr1).replaceByValue(14, 14004).value);
// console.log(Arr(arr1).replaceByValue(14, 14004, false).value);
// console.log(Arr(arr1).replaceByValues([14, 1], [140, 100]).value);
// console.log(Arr(arr1).replaceByIndex(3, 7000).value);
// console.log(Arr([ 'bg', 'ce', 'ct', 'zd' ]).reverse().value);
// console.log(Arr(arr2).column(3, "c.d").sort({ order: "descending" }).value);
// console.log(Arr([]).range(5000).shuffle().sort({ order: "descending", sortType: "HeapSort" }).slice(0,11).value);
// console.log(Arr([7,2,5,9,0,14,11]).sort({}).value);
// console.log(Arr(arr2).sort({ sortBy: item => item[3].c.e.f }).value);
// console.log(Arr([1,2,3]).interpolate([2, undefined, 6]));

// const array1 = [1,2,3,4,5,6]
// const array2 = [1,2,9,7,8,6]

// console.log(difference(array1, array2));

// console.log(Arr(array1).difference(array2).value)
const array3 = [1,2,9,7,8,6,2,6,2]
// console.log(count(2, array3))
console.log(chunk(3, array3));
clear(array3);
console.log(array3)