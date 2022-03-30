// optional config dependencies: lodash.clonedeep, serialize-javascript, flat
import { isPrimitive, ISNAN, isObject, clonedeep, IterateeError, swap, and_or, minOf_maxOf, min_max, minBy_maxBy, sumOf_productOf } from "../utils/helpers.js";
import { readOnly } from "../src/fp/readOnly.js";
import { sortify } from "../utils/sort.js";

class ArraySlayer {
  #next = -1;
  #originalArray;
  serialize = JSON.stringify;
  clonedeep = clonedeep;

  constructor(arr, config) {
    if (!Array.isArray(arr)) throw new Error("parameter is not Array");
    this.initConfig(config);
    this.#originalArray = arr;
    this.arr = arr.concat();
  }

  initConfig(config) {
    if (!config) return;
    if (config.serialize) this.serialize = config.serialize;
    if (config.clonedeep) this.clonedeep = config.clonedeep;
  }

  get value() {
    return this.arr;
  }

  get length() {
    return this.arr.length;
  }

  get lastElement() {
    return this.arr[this.arr.length - 1];
  }

  #manipulateArray(method, ...params){
    this.arr = this.arr[method](...params);
    return this;
  }

  // native JavaScript Array prototype methods - start
  concat(...items) {
    return this.#manipulateArray("concat", ...items);
  }

  copyWithin(target, start, end) {
    return this.#manipulateArray("copyWithin", target, start, end);
  }

  entries() {
    return this.arr.entries();
  }

  every(callbackfn, thisArg) {
    return this.arr.every(callbackfn, thisArg);
  }

  fill(value, start, end) {
    return this.#manipulateArray("fill", value, start, end);
  }

  filter(callbackfn, thisArg) {
    return this.#manipulateArray("filter", callbackfn, thisArg);
  }

  find(perdicate, thisArg) {
    return this.arr.find(perdicate, thisArg);
  }

  findIndex(perdicate, thisArg) {
    return this.#manipulateArray("findIndex", perdicate, thisArg);
  }

  flat(depth = 1) {
    return this.#manipulateArray("flat", depth);
  }

  flatMap(callback, thisArg) {
    return this.#manipulateArray("flatMap", callback, thisArg);
  }

  forEach(callback, thisArg) {
    return this.#manipulateArray("forEach", callback, thisArg);
  }

  includes(searchElement, fromIndex) {
    return this.#manipulateArray("includes", searchElement, fromIndex);
  }

  indexOf(searchElement, fromIndex) {
    return this.#manipulateArray("indexOf", searchElement, fromIndex);
  }

  join(seperator) {
    return this.#manipulateArray("join", seperator);
  }

  keys() {
    return this.arr.keys();
  }

  lastIndexOf(searchElement, fromIndex) {
    return this.#manipulateArray("lastIndexOf", searchElement, fromIndex);
  }

  map(callback, thisArg) {
    return this.#manipulateArray("map", callback, thisArg);
  }

  push(...items) {
    return this.arr.push(...items);
  }

  pop() {
    return this.arr.pop();
  }

  reduce(callbackfn, initialValue) {
    return this.#manipulateArray("reduce", callbackfn, initialValue);
  }

  reduceRight(callbackfn, initialValue) {
    return this.#manipulateArray("reduceRight", callbackfn, initialValue);
  }

  // reverse(){}   // I overwrite this by my own reverse function

  shift() {
    return this.#manipulateArray("shift");
  }

  slice(start, end) {
    return this.#manipulateArray("slice", start, end);
  }

  some(callback, thisArg) {
    return this.#manipulateArray("some", callback, thisArg);
  }

  // sort(){}   // I overwrite this by my own sort function

  splice(start, deleteCount, ...items) {
    return this.#manipulateArray("splice", start, deleteCount, ...items);
  }

  toLocaleString() {
    return this.#manipulateArray("toLocaleString");
  }

  toString() {
    return this.#manipulateArray("forEach");
  }

  unshift(...items) {
    return this.#manipulateArray("unshift", ...items);
  }

  values() {
    return this.arr.values();
  }

  hasOwnProperty(property) {
    return this.arr.hasOwnProperty(property);
  }

  isPrototypeOf(obj) {
    return this.arr.isPrototypeOf(obj);
  }

  propertyIsEnumerable(property) {
    return this.arr.propertyIsEnumerable(property);
  }
  // native JavaScript Array prototype methods - end

  // arraySlayer methods
  count(item) {
    const Arr = this.arr;
    let amount = 0;

    if (item === null) {
      Arr.forEach((arrItem) => {
        if (arrItem === null) {
          amount += 1;
        }
      });
    } else if (ISNAN(item)) {
      Arr.forEach((arrItem) => {
        if (ISNAN(arrItem)) {
          amount += 1;
        }
      });
    } else if (typeof item === "number" || typeof item === "string") {
      Arr.forEach((arrItem) => {
        if (arrItem === item) {
          amount += 1;
        }
      });
    } else {
      Arr.forEach((arrItem) => {
        if (this.serialize(item) === this.serialize(arrItem)) {
          amount += 1;
        }
      });
    }
    return amount;
  }

  chunk(size) {
    if (size < 0 || !size) throw new Error("size should be defined as a positive value");
    const res = [];
    const Arr = this.arr;
    const count = Math.ceil(Arr.length / size);
    for (let i = 0; i < count; i++) {
      res.push(Arr.slice(i * size, i * size + size));
    }
    this.arr = res;
    return this;
  }

  clear() {
    //removes all elements form arr (in place)
    this.#originalArray.splice(0);
    this.arr.splice(0);
    return this;
  }

  mutate() {
    this.arr = this.#originalArray;
    return this;
  }

  column(colIndex, key) {
    let Arr = this.arr;
    if (typeof colIndex === "function") {
      Arr = Arr.map(colIndex);
    }
    else if (!!key && typeof key === "string") {
      const keys = key.split(".");
      Arr = Arr.map((item) => keys.reduce((a, b) => a[b], item[colIndex]));
    }
    else if (!!key) {
      throw new Error("key has to be of type 'string'");
    }
    else {
      Arr = Arr.map((item) => item[colIndex]);
    }
    this.arr = Arr;
    return this;
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  isUnique() {
    const Arr = this.arr;
    if (Arr.length !== [...new Set(Arr)].length) return false;
    const newArr = Arr.map((item) => (typeof item === "object" && item !== null ? this.serialize(item) : item));
    return newArr.length === [...new Set(newArr)].length;
  }

  isEqual(arr2) {
    return this.serialize(this.arr) === this.serialize(arr2);
  }

  has(item) {
    if (isPrimitive(item) || ISNAN(item)) {
      return new Set(this.arr).has(item);
    }
    return this.arr.map((arrItem) => this.serialize(arrItem)).includes(this.serialize(item));
  }

  hasDuplicates() {
    return !this.isUnique();
  }

  hasArray() {
    return this.arr.some((item) => Array.isArray(item));
  }

  hasObject() {
    return this.arr.some(isObject);
  }

  hasEmptyArr() {
    return this.arr.some((item) => Array.isArray(item) && item.length === 0);
  }

  hasEmptyObj() {
    return this.arr.some((item) => isObject(item) && Object.keys(item).length === 0);
  }

  hasNull() {
    return new Set(this.arr).has(null);
  }

  hasUndefined() {
    return new Set(this.arr).has(undefined);
  }

  hasNullish() {
    const set = new Set(this.arr);
    return set.has(null) || set.has(undefined);
  }

  hasNaN() {
    return new Set(this.arr).has(NaN);
  }

  hasTrue() {
    return new Set(this.arr).has(true);
  }

  hasFalse() {
    return new Set(this.arr).has(false);
  }

  hasBoolean() {
    const arrSet = new Set(this.arr);
    return arrSet.has(false) || arrSet.has(true);
  }

  hasAll(primitives = []) {
    const set = new Set(this.arr);
    return primitives.every(primitive => set.has(primitive));
  }

  hasAllTypes(types = [], arr) {
    const set = new Set(arr);
    return types.every(type => set.has(typeof type));
  }

  hasNumber() {
    return this.arr.some((item) => typeof item === "number" && !isNaN(item));
  }

  hasString() {
    return this.arr.some((item) => typeof item === "string");
  }

  hasTruthy() {
    return this.arr.some((item) => !!item);
  }

  hasFalsy() {
    return this.arr.some((item) => !item);
  }

  repeat(count = 2) {
    return Array.from({ length: count }, () => this.arr).flat();
  }

  row(index) {
    this.arr = this.arr[index];
    return this;
  }

  at(index) {
    this.arr = index >= 0 ? this.arr[index] : this.arr[this.arr.length + index];
    return this;
  }

  findLast(callback, thisArg) {
    const arr = this.arr;
    for (let index = arr.length - 1; index >= 0; index--) {
        const value = arr[index];
        if (callback.call(thisArg, value, index, arr)) {
            return value;
        }
    }
    return undefined;
  }

  findDuplicates() {
    const sortedArr = this.arr.slice().sort();
    const results = [];
    for (let i = 0; i < sortedArr.length - 1; i++) {
      if (sortedArr[i + 1] == sortedArr[i]) {
        results.push(sortedArr[i]);
      }
    }
    this.arr = [...new Set(results)];
    return this;
  }

  findAllOccurences(value, findBy = (item) => item) {
    const indexes = [];
    const needsFormat = ISNAN(value) || !isPrimitive(value);
    if (needsFormat) {
      const _value = this.serialize(value);
      this.arr.map(findBy).forEach((item, index) => {
        if (this.serialize(item) === _value) indexes.push(index);
      });
    } else {
      this.arr.map(findBy).forEach((item, index) => {
        if (item === value) indexes.push(index);
      });
    }
    this.arr = indexes;
    return this;
  }

  getTruthyValues() {
    return this.#manipulateArray("filter", (item) => !!item);
  }

  getFalsyValues() {
    return this.#manipulateArray("filter", (item) => !item);
  }

  getAllKeys() {
    this.arr = Object.keys(this.arr);
    return this;
  }

  random() {
    return this.arr[Math.floor(Math.random() * this.arr.length)];
  }

  rotate(count = 0, direction = "clockwise") {
    let Arr = this.arr;
    if (count <= 0) return Arr;
    const index = count % Arr.length;
    if (direction === "clockwise") {
      Arr = Arr.slice(-1 * index).concat(Arr.slice(0, -1 * index));
    } else if (direction === "counterclockwise") {
      Arr = Arr.slice(index).concat(Arr.slice(0, index));
    } else {
      throw new Error(
        '"direction" prop can only be either "clockwise" or "counterclockwise".'
      );
    }
    this.arr = Arr;
    return this;
  }

  xsplice(targetIndex, howManyToRemove = 0, ...newItems) {
    const copy = this.arr.slice();
    copy.splice(targetIndex, howManyToRemove, ...newItems);
    this.arr = copy;
    return this;
  }

  xpop() {
    this.arr.pop();
    return this;
  }

  xpush(...items) {
    this.arr.push(...items);
    return this;
  }

  xshift() {
    this.arr.shift();
    return this;
  }

  xunshift(...items) {
    this.arr.unshift(...items);
    return this;
  }

  shuffle() {
    // Modern Fisher-Yates Algorithm
    const len = this.arr.length - 1;
    let j, i;
    for (i = len; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      swap(this.arr[i], this.arr[j]);
    }
    return this;
  }

  take(n, startIndex = 0) {
    return this.#manipulateArray("slice", startIndex, startIndex + n);
  }

  max(...arrays) {
    return min_max(this.arr, "max", arrays);
  }

  min(...arrays) {
    return min_max(this.arr, "min", arrays);
  }

  maxOf(iteratee) {
    return minOf_maxOf(this.arr, iteratee, "max");
  }

  minOf(iteratee) {
    return minOf_maxOf(this.arr, iteratee, "min");
  }

  maxBy(iteratee) {
    return minBy_maxBy(this.arr, iteratee, "max");
  }

  minBy(iteratee) {
    return minBy_maxBy(this.arr, iteratee, "min");
  }

  sum() {
    return this.arr.reduce((a, b) => a + b, 0);
  }

  sumOf(iteratee) {
    return sumOf_productOf(this.arr, iteratee, "+");
  }

  mean() {
    return this.arr.reduce((a, b) => a + b, 0) / this.arr.length;
  }

  meanOf(iteratee) {
    const sum = this.sumOf(iteratee);
    return sum / this.arr.length;
  }

  product() {
    return this.arr.reduce((a, b) => a * b, 1);
  }

  productOf(iteratee) {
    return sumOf_productOf(this.arr, iteratee, "*");
  }

  // A ∪ B ∪ C ...
  union(...arrays) {
    this.arr = [...new Set([...this.arr, ...arrays.flat(Infinity)])];
    return this;
  }

  // A ∩ B ∩ C ...
  intersection(...arrays) {
    [this.arr, ...arrays].reduce((a, b) => {
      const setB = new Set(b);
      this.arr = a.filter((c) => setB.has(c));
      return this;
    });
  }

  difference(arr2) {
    const arr2Set = new Set(arr2);
    this.arr = this.arr.filter((arrItem) => !arr2Set.has(arrItem));
    return this;
  }

  // (A - B) ∪ (B - A) = (A ∪ B) - (A ∩ B)
  symmetricDifference(arr2) {
    const arr1Set = new Set(this.arr);
    const arr2Set = new Set(arr2);
    const left = [...arr1Set].filter((arrItem) => !arr2Set.has(arrItem));
    const right = [...arr2Set].filter((arrItem) => !arr1Set.has(arrItem));
    this.arr = left.concat(right);
    return this;
  }

  unique() {
    this.arr = [...new Set(this.arr)];
    return this;
  }

  uniqueBy(iteratee) {
    let items = [];
    if (typeof iteratee === "function") {
      items = this.arr.map(iteratee);
    }
    if (typeof iteratee === "string") {
      const keys = iteratee.split(".");
      items = this.arr.map((item) => keys.reduce((a, b) => a[b], item));
    }
    if (typeof iteratee !== "function" && typeof iteratee !== "string") {
      IterateeError();
    }

    const sortedItems = items.slice().sort();
    const duplicateResults = [];
    for (let i = 0; i < sortedItems.length - 1; i++) {
      if (sortedItems[i + 1] == sortedItems[i]) {
        duplicateResults.push(sortedItems[i]);
      }
    }
    const duplicates = new Set(duplicateResults);
    const uniq = items.map((item, index) => (duplicates.has(item) ? undefined : index));
    const indexes = new Set(uniq);
    indexes.delete(undefined);
    this.arr = [...indexes].map((index) => this.arr[index]);
    return this;
  }

  deepCopy() {
    this.arr = this.clonedeep(this.arr);
    return this;
  }

  types() {
    this.arr = [...new Set(this.arr.map((item) => typeof item))];
    return this;
  }

  isSingle() {
    return this.arr.length === 1;
  }

  dotProduct(arr2) {
    const Arr = this.arr;
    if (Arr.length !== arr2.length) {
      throw new Error("arrays must be of the same length to produce dot product.");
    }
    let result = 0;
    for (let i = 0; i < Arr.length; i++) {
      result += Arr[i] * arr2[i];
    }
    return result;
  }

  crossProduct(arr2) {
    const Arr = this.arr;
    if (Arr.length !== arr2.length) {
      throw new Error("arrays must be of the same length to produce cross product.");
    }
    if (Arr.length <= 1) return 0;
    if (Arr.length === 2) {
      return [Arr[0] * arr2[1] - Arr[1] * arr2[0]];
    }
    if (Arr.length === 3) {
      return [
        Arr[1] * arr2[2] - Arr[2] * arr2[1],
        Arr[2] * arr2[0] - Arr[0] * arr2[2],
        Arr[0] * arr2[1] - Arr[1] * arr2[0],
      ];
    }
    throw new Error("minimum allowed array length is 3.");
  }

  range(start, end) {
    // start & end are included
    if (start !== undefined && end === undefined) {
      this.arr = Array(start + 1)
        .fill()
        .map((_, index) => index);
      return this;
    }
    this.arr = Array(end - start + 1)
      .fill()
      .map((_, index) => start + index);
    return this;
  }

  readOnly() {
    this.arr = readOnly(this.arr);
    return this.arr;
  }

  swapByIndexes(index1, index2) {
    swap(this.arr[index1], this.arr[index2]);
    return this;
  }

  swapByValues(value1, value2) {
    let arr = this.arr;
    let val1 = value1;
    let val2 = value2;
    if (!isPrimitive(value1) || !isPrimitive(value2)) {
      arr = this.arr.map((item) => this.serialize(item));
      val1 = this.serialize(val1);
      val2 = this.serialize(val2);
    }
    const index1 = arr.findIndex((item) => item === val1);
    const index2 = arr.findIndex((item) => item === val2);
    if (!(index1 > -1 && index2 > -1)) {
      throw new Error("value is not present in the array.");
    }
    swap(this.arr[index1], this.arr[index2]);
    return this;
  }

  deleteByIndexes(...selectedIndexes) {
    // removes items from array (changes the array length)
    const indexes = new Set([...selectedIndexes]);
    this.arr = this.arr.filter((_, idx) => !indexes.has(idx));
    return this;
  }

  deleteByValues(...selectedValues) {
    const serializedSelection = [...selectedValues].map((item) => this.serialize(item));
    const values = new Set([...serializedSelection]);
    this.arr = this.arr.filter((item) => !values.has(this.serialize(item)));
    return this;
  }

  clearByIndexes(...selectedIndexes) {
    // replaces the values by undefined (keeps the array length)
    [...selectedIndexes].forEach((index) => {
      if (this.arr[index] !== undefined) {
        this.arr[index] = undefined;
      }
    });
    return this;
  }

  clearByValues(...selectedValues) {
    const serializedSelection = [...selectedValues].map((item) => this.serialize(item));
    const values = new Set([...serializedSelection]);
    this.arr = this.arr.map((item) => (!values.has(this.serialize(item)) ? item : undefined));
    return this;
  }

  replaceByIndex(index, newValue) {
    this.arr.splice(index, 1, newValue);
    return this;
  }

  replaceByIndexes(indexes = [], newValues = []) {
    indexes.forEach((index) => {
      this.arr[index] = newValues[index];
    });
    return this;
  }

  replaceByValue(currentItem, newItem, replaceAllOccurences = true) {
    const arr = this.arr.slice();
    const indexes = replaceAllOccurences
      ? this.findAllOccurences(currentItem)
      : { value: [this.arr.indexOf(currentItem)] };
    if (indexes.value[0] > -1) {
      indexes.value.forEach((index) => {
        arr[index] = newItem;
      });
    }
    this.arr = arr;
    return this;
  }

  replaceByValues(currentItems = [], newItems = []) {
    if (currentItems.length !== newItems.length) {
      throw new Error("can't replace values because the arrays that you have provided are not of equal size.");
    }
    currentItems.forEach((item, index) => {
      this.replaceByValue(item, newItems[index]);
    });
    return this;
  }

  toJSONObject(keys = [], values = []) {
    if (keys.length + values.length === 0) {
      return clonedeep({ ...this.arr });
    }
    if (!Array.isArray(keys) || !Array.isArray(values)) {
      throw new Error("'keys' and 'values' must be arrays.");
    }
    if (keys.length !== values.length) {
      throw new Error("array length of 'keys' and 'values' must be the same.");
    }
    const res = {};
    const _keys = clonedeep(keys);
    const _values = clonedeep(values);
    if (_keys.length !== _values.length) {
      throw new Error("objects' inner values must be of primitive types.");
    }
    _keys.forEach((key, index) => {
      res[key] = _values[index];
    });
    return res;
  }

  reverse() {
    const len = this.arr.length;
    const middleItem = Math.floor(len / 2);
    for (let i = 0; i < middleItem; i++) {
      swap(this.arr[i], this.arr[len - 1 - i]);
    }
    return this;
  }

  OR(item, callback) {
    return and_or(item, callback, this.arr, "some");
  }

  AND(item, callback) {
    return and_or(item, callback, this.arr, "every");
  }

  // OR-ALL: [a, b, c] => (a || bool) || (b || bool) || (c || bool)
  OR_ALL(bool = false) {
    return !!bool || this.arr.some((item) => !!item);
  }

  // AND-ALL: [a, b, c] => (a && bool) && (b && bool) && (c && bool)
  AND_ALL(bool = true) {
    return !!bool && this.arr.every((item) => !!item);
  }

  // OR-AND: [a, b, c] => (a || bool) && (b || bool) && (c || bool)
  OR_AND(bool = true) {
    return this.arr.every((item) => !!item || !!bool);
  }

  // AND-OR: [a, b, c] => (a && bool) || (b && bool) || (c && bool)
  AND_OR(bool = true) {
    return this.arr.some((item) => !!item && !!bool);
  }

  XOR_ALL(bool = false) {
    return !!this.arr.map((item) => !!item).reduce((a, b) => a ^ b, false) ^ !!bool;
  }

  interpolate(arr2) {
    / * Linear Interpolation */;
    // A     a
    // B     x = ?
    // C     c
    if (this.arr.length !== 3) {
      throw new Error(
        'left array length must be 3, representing the "starting", "middle" & "final" values respectively.'
      );
    }
    if (arr2.length !== 3 || ![undefined, null, false, "x", "X", "?"].includes(arr2[1])) {
      throw new Error("right array length must be 3, representing the [$starting_value, undefined, $final_value].");
    }
    const [A, B, C] = this.arr;
    const [a, , c] = arr2;
    return c - ((c - a) * (C - B)) / (C - A);
  }

  // for 2D Matrices
  getSurroundingSquares(x, y, filter = true) {
    const arr = this.arr;
    if (x >= arr.length || y >= arr[0].length || x < 0 || y < 0) return [];
    const C = item => item === undefined ? [] : item;
    const result = [
      C(arr[x-1])[y-1],    C(arr[x-1])[y],    C(arr[x-1])[y+1],
      C(arr[ x ])[y-1],  /* target square */  C(arr[ x ])[y+1],
      C(arr[x+1])[y-1],    C(arr[x+1])[y],    C(arr[x+1])[y+1],
    ];
    return filter ? result.filter(i => i !== undefined) : result;
  }

  sort({ order = "ascending", sortType = "QuickSort", sortBy } = {}) {
    // order: "ascending" | "descending"
    // sortType: "QuickSort" | "MergeSort" | "InsertionSort" | "BubbleSort" | "RadixSort" | "HeapSort"
    let _sortBy, hasSortBy;
    let Arr = this.arr;

    if (sortBy !== undefined && typeof sortBy !== "function") {
      throw new Error('"sortBy" has to be a function.');
    }

    if (sortBy) {
      _sortBy = sortBy;
      hasSortBy = true;
    } else {
      _sortBy = (item) => item;
    }

    const types = [...new Set(Arr.map((item) => typeof _sortBy(item)))];
    if (types.length > 1) {
      throw new Error("cannot sort items of different types.");
    }

    if (types[0] !== "number" && types[0] !== "string") {
      throw new Error("cannot sort items of complex types. sorting is only possible on numbers or strings.");
    }

    const lookupTable = {}; // sortItem: mainItem
    const arr = Arr.slice();
    const items = Arr.map(_sortBy);
    items.forEach((item, index) => {
      lookupTable[item] = arr[index];
    });

    Arr = sortify[sortType](items);
    if (order === "descending") this.reverse();

    const res = [];
    if (hasSortBy) {
      Arr.map((item) => {
        res.push(lookupTable[item]);
      });
      Arr = res;
    }

    this.arr = Arr;
    return this;
  }

  numbersList(start, end, step = 1) {
    this.arr = Array.from( { length: Math.ceil((end - start + 1) / step) }, (_, i) => start + i * step);
    return this;
  }

  zip(...arrays) {
    return this.#manipulateArray("map", (item, idx) => arrays.reduce((a, b) => [...a, b[idx]], [item]));
  }

  unzip(){
    this.arr = this.zip(this.arr).value;
    return this;
  }

  next() {
    this.#next += 1;
    return this.arr[this.#next];
  }
}

const Arr = (arr, config) => new ArraySlayer(arr, config);

export default Arr;
