// future collections: 'Obj', 'Num', 'Matrix', 'Str', 'Date'
// optional config dependencies: lodash.clonedeep, serialize-javascript, flat
import { PRIMITIVE_TYPES, ISNAN, isObject, checkLengths } from "../utils/helpers.js";
import { sortify } from "../utils/sort.js";
import ArraySlayerBase from "./fp/index.js";

class ArraySlayer extends ArraySlayerBase {
  constructor(arr, config){
    super(arr, config);
  }

  // native JavaScript Array prototype methods - start
  concat(...items) {
    this.arr = this.arr.concat(...items);
    return this;
  }

  copyWithin(target, start, end) {
    this.arr = this.arr.copyWithin(target, start, end);
    return this;
  }

  entries() {
    return this.arr.entries();
  }

  every(callbackfn, thisArg) {
    return this.arr.every(callbackfn, thisArg);
  }

  fill(value, start, end) {
    this.arr = this.arr.fill(value, start, end);
    return this;
  }

  filter(callbackfn, thisArg) {
    this.arr = this.arr.filter(callbackfn, thisArg);
    return this;
  }

  find(perdicate, thisArg) {
    return this.arr.find(perdicate, thisArg);
  }

  findIndex(perdicate, thisArg) {
    this.arr = this.arr.findIndex(perdicate, thisArg);
    return this;
  }

  flat(depth = 1) {
    this.arr = this.arr.flat(depth);
    return this;
  }

  flatMap(callback, thisArg) {
    this.arr = this.arr.flatMap(callback, thisArg);
    return this;
  }

  forEach(callback, thisArg) {
    this.arr = this.arr.forEach(callback, thisArg);
    return this;
  }

  includes(searchElement, fromIndex) {
    this.arr = this.arr.includes(searchElement, fromIndex);
    return this;
  }

  indexOf(searchElement, fromIndex) {
    this.arr = this.arr.indexOf(searchElement, fromIndex);
    return this;
  }

  join(seperator) {
    this.arr = this.arr.join(seperator);
    return this;
  }

  keys() {
    return this.arr.keys();
  }

  lastIndexOf(searchElement, fromIndex) {
    this.arr = this.arr.lastIndexOf(searchElement, fromIndex);
    return this;
  }

  map(callback, thisArg) {
    this.arr = this.arr.map(callback, thisArg);
    return this;
  }

  push(...items) {
    this.arr = this.arr.push(...items);
    return this;
  }

  reduce(callbackfn, initialValue) {
    this.arr = this.arr.reduce(callbackfn, initialValue);
    return this;
  }

  reduceRight(callbackfn, initialValue) {
    this.arr = this.arr.reduceRight(callbackfn, initialValue);
    return this;
  }

  // reverse(){}   // I overwrite this by my own reverse function

  shift() {
    this.arr = this.arr.shift();
    return this;
  }

  slice(start, end) {
    this.arr = this.arr.slice(start, end);
    return this;
  }

  some(callback, thisArg) {
    this.arr = this.arr.some(callback, thisArg);
    return this;
  }

  // sort(){}   // I overwrite this by my own sort function

  splice(start, deleteCount, ...items) {
    this.arr = this.arr.splice(start, deleteCount, ...items);
    return this;
  }

  toLocaleString() {
    this.arr = this.arr.toLocaleString();
    return this;
  }

  toString() {
    this.arr = this.arr.toString();
    return this;
  }

  unshift(...items) {
    this.arr = this.arr.unshift(...items);
    return this;
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
    let amount = 0;

    if (item === null) {
      this.arr.forEach((arrItem) => {
        if (arrItem === null) {
          ++amount;
        }
      });
    } else if (ISNAN(item)) {
      this.arr.forEach((arrItem) => {
        if (ISNAN(arrItem)) {
          ++amount;
        }
      });
    } else if (typeof item === "number" || typeof item === "string") {
      this.arr.forEach((arrItem) => {
        if (arrItem === item) {
          ++amount;
        }
      });
    } else {
      this.arr.forEach((arrItem) => {
        if (this.serialize(item) === this.serialize(arrItem)) {
          ++amount;
        }
      });
    }
    return amount;
  }

  chunk(size) {
    const res = [];
    const count = Math.ceil(this.arr.length / size);
    for (let i = 0; i < count; i++) {
      res.push(this.arr.slice(i * size, i * size + size));
    }
    this.arr = res;
    return this;
  }

  clear(inPlace = false) {
    //removes all elements form arr (in place)
    if (inPlace) {
      this._originalArray.splice(0);
    }
    this.arr.splice(0);
    return this;
  }

  mutate() {
    this.arr = this._originalArray;
    return this;
  }

  column(colIndex, key) {
    if (typeof colIndex === "function") {
      this.arr = this.arr.map(colIndex);
      return this;
    }
    if (!!key && typeof key === "string") {
      const keys = key.split(".");
      this.arr = this.arr.map(item => keys.reduce((a,b) => a[b], item[colIndex]));
      return this;
    }
    if (!!key) {
      throw new Error("key has to be of type 'string'");
    }
    this.arr = this.arr.map((item) => item[colIndex]);
    return this;
  }

  isEmpty() {
    return this.arr.length === 0;
  }

  isUnique() {
    if (this.arr.length !== [...new Set(this.arr)].length) return false;
    const newArr = this.arr.map((item) => (typeof item === "object" && item !== null ? this.serialize(item) : item));
    return newArr.length === [...new Set(newArr)].length;
  }

  isEqual(arr2) {
    return this.serialize(this.arr) === this.serialize(arr2);
  }

  has(item) {
    if (PRIMITIVE_TYPES.has(typeof item) || ISNAN(item)) {
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

  hasNumber() {
    return this.arr.some((item) => typeof item === "number");
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

  row(index) {
    this.arr = this.arr[index];
    return this;
  }

  index(index) {
    this.arr = this.arr[index];
    return this;
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
    const needsFormat = ISNAN(value) || !PRIMITIVE_TYPES.has(typeof value);
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

  getTruthyValues(){
    this.arr = this.arr.filter(item => !!item);
    return this;
  }

  getFalsyValues(){
    this.arr = this.arr.filter(item => !item);
    return this;
  }

  getAllKeys(){
    this.arr = Object.keys(this.arr);
    return this;
  }

  random() {
    return this.arr[Math.floor(Math.random() * this.arr.length)];
  }

  rotate(count = 0, direction = "clockwise") {
    if (count <= 0) return this.arr;
    const index = count % this.arr.length;
    if (direction === "clockwise") {
      this.arr = this.arr.slice(-1 * index).concat(this.arr.slice(0, -1 * index));
      return this;
    } else if (direction === "counterclockwise") {
      this.arr = this.arr.slice(index).concat(this.arr.slice(0, index));
      return this;
    } else {
      throw new Error(
        '"direction" prop can only be either "clockwise" or "counterclockwise". The value you have provided is not valid.'
      );
    }
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
    let j, x, i;
    for (i = len; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = this.arr[i];
      this.arr[i] = this.arr[j];
      this.arr[j] = x;
    }
    return this;
  }

  take(n, startIndex = 0) {
    this.arr = this.arr.slice(startIndex, startIndex + n);
    return this;
  }

  max() {
    return Math.max(...this.arr);
  }

  min() {
    return Math.min(...this.arr);
  }

  maxOf(iteratee) {
    // returns the "column" element of the array in which iteratee is max
    if (typeof iteratee === "function") {
      return Math.max(...this.arr.map(iteratee));
    }
    if (typeof iteratee === "string") {
      const keys = iteratee.split(".");
      if (keys.length === 1) {
        return Math.max(...this.arr.map((item) => item[keys[0]]));
      }
      const res = this.arr.map(item => keys.reduce((a,b) => a[b], item));
      return Math.max(...res);
    }
    throw new Error("iteratee has to be either of type 'string' or 'function'");
  }

  minOf(iteratee) {
    // returns the "column" element of the array in which iteratee is min
    if (typeof iteratee === "function") {
      return Math.min(...this.arr.map(iteratee));
    }
    if (typeof iteratee === "string") {
      const keys = iteratee.split(".");
      if (keys.length === 1) {
        return Math.min(...this.arr.map((item) => item[keys[0]]));
      }
      const res = this.arr.map(item => keys.reduce((a,b) => a[b], item));
      return Math.min(...res);
    }
    throw new Error("iteratee has to be either of type 'string' or 'function'");
  }

  maxBy(iteratee) {
    // returns the "main" element of the array in which iteratee is max
    if (typeof iteratee === "function") {
      const max = Math.max(...this.arr.map(iteratee));
      return this.arr.find(item => iteratee(item) === max);
    }
    if (typeof iteratee === "string") {
      const keys = iteratee.split(".");
      if (keys.length === 1) {
        const max = Math.max(...this.arr.map((item) => item[keys[0]]));
        return this.arr.find(item => item[keys[0]] === max);
      }
      const res = this.arr.map(item => keys.reduce((a,b) => a[b], item));
      const max = Math.max(...res);
      return this.arr.find((_, index) => res[index] === max);
    }
    throw new Error("iteratee has to be either of type 'string' or 'function'");
  }

  minBy(iteratee) {
    // returns the "main" element of the array in which iteratee is min
    if (typeof iteratee === "function") {
      const min = Math.min(...this.arr.map(iteratee));
      return this.arr.find(item => iteratee(item) === min);
    }
    if (typeof iteratee === "string") {
      const keys = iteratee.split(".");
      if (keys.length === 1) {
        const min = Math.min(...this.arr.map((item) => item[keys[0]]));
        return this.arr.find(item => item[keys[0]] === min);
      }
      const res = this.arr.map(item => keys.reduce((a,b) => a[b], item));
      const min = Math.min(...res);
      return this.arr.find((_, index) => res[index] === min);
    }
    throw new Error("iteratee has to be either of type 'string' or 'function'");
  }

  sum() {
    return this.arr.reduce((a, b) => a + b, 0);
  }

  sumOf(iteratee) {
    let res = 0;
    if (typeof iteratee === "function") {
      for (let item of this.arr) {
        res += iteratee(item);
      }
      return res;
    }
    if (typeof iteratee === "string") {
      const keys = iteratee.split(".");
      for (let item of this.arr) {
        let obj = item[keys[0]];
        for (let i = 1; i < keys.length; i++) {
          obj = obj[keys[i]];
        }
        res += obj;
      }
      return res;
    }
    throw new Error("iteratee has to be either of type 'string' or 'function'");
  }

  mean(){
    return this.arr.reduce((a, b) => a + b, 0) / this.arr.length;
  }

  meanOf(iteratee) {
    const sum = this.sumOf(iteratee);
    return sum / this.arr.length;
  }
  
  product(){
    return this.arr.reduce((a, b) => a * b, 1);
  }

  productOf(iteratee) {
    let res = 1;
    if (typeof iteratee === "function") {
      for (let item of this.arr) {
        res *= iteratee(item);
      }
      return res;
    }
    if (typeof iteratee === "string") {
      const keys = iteratee.split(".");
      for (let item of this.arr) {
        let obj = item[keys[0]];
        for (let i = 1; i < keys.length; i++) {
          obj = obj[keys[i]];
        }
        res *= obj;
      }
      return res;
    }
    throw new Error("iteratee has to be either of type 'string' or 'function'");
  }

  // A ∪ B ∪ C ...
  union(...arrays){
    this.arr = [...new Set([...this.arr, ...arrays.flat(Infinity)])]
    return this;
  }

  // A ∩ B ∩ C ...
  intersection(...arrays){
    [this.arr, ...arrays].reduce((a, b) => {
      const setB = new Set(b);
      this.arr = a.filter((c) => setB.has(c));
      return this;
    });
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
      items = this.arr.map(item => keys.reduce((a,b) => a[b], item));
    }
    if (typeof iteratee !== "function" && typeof iteratee !== "string"){
      throw new Error("iteratee has to be either of type 'string' or 'function'");
    }

    const sortedItems = items.slice().sort();
      const duplicateResults = [];
      for (let i = 0; i < sortedItems.length - 1; i++) {
        if (sortedItems[i + 1] == sortedItems[i]) {
          duplicateResults.push(sortedItems[i]);
        }
      }
      const duplicates = new Set(duplicateResults);
      const uniq = items.map((item, index) => duplicates.has(item) ? undefined : index);
      const indexes = new Set(uniq);
      indexes.delete(undefined);
      this.arr = [...indexes].map(index => this.arr[index]);
      return this;
  }

  deepCopy() {
    this.arr = this.clonedeep(this.arr);
    return this;
  }

  types(){
   this.arr = [...new Set(this.arr.map((item) => typeof item))];
   return this;
  }

  isSingle() {
    return this.arr.length === 1;
  }

  dotProduct(arr2) {
    if (this.arr.length !== arr2.length){
      throw new Error("arrays must be of the same length to produce dot product.")
    }
    let result = 0;
    for (let i = 0; i < this.arr.length; i++){
      result += this.arr[i] * arr2[i];
    }
    return result;
  }

  crossProduct(arr2) {
    if (this.arr.length !== arr2.length){
      throw new Error("arrays must be of the same length to produce cross product.");
    }
    if (this.arr.length <= 1) return 0;
    if (this.arr.length === 2){
      return [this.arr[0] * arr2[1] - this.arr[1] * arr2[0]];
    }
    if (this.arr.length === 3) {
      return [
        this.arr[1] * arr2[2] - this.arr[2] * arr2[1],
        this.arr[2] * arr2[0] - this.arr[0] * arr2[2],
        this.arr[0] * arr2[1] - this.arr[1] * arr2[0]
      ];
    }
    throw new Error("arrays must be of the length less than or equal to 3.");
  }

  range(start, end) {
    // start & end are included
    if (start !== undefined && end === undefined){
        this.arr = Array(start + 1).fill().map((_, index) => index);
        return this;
    }
    this.arr = Array(end - start + 1).fill().map((_, index) => start + index);
    return this;
  }

  readOnly() {
    class ReadOnlyArray extends Array {
        constructor(mutable) {
            super(0);
            this.push(...mutable);
            Object.freeze(this);
        }
        static get [Symbol.species]() { return Array; }
    }
    return new ReadOnlyArray(this.arr);
  }

  swapByIndexes(index1, index2) {
    [this.arr[index1], this.arr[index2]] = [this.arr[index2], this.arr[index1]];
    return this;
  }

  swapByValues(value1, value2) {
    let arr = this.arr;
    let val1 = value1;
    let val2 = value2;
    if (!PRIMITIVE_TYPES.has(typeof value1) || !PRIMITIVE_TYPES.has(typeof value2)){
      arr = this.arr.map(item => this.serialize(item));
      val1 = this.serialize(val1);
      val2 = this.serialize(val2);
    }
    const index1 = arr.findIndex(item => item === val1);
    const index2 = arr.findIndex(item => item === val2);
    if (!(index1 > -1 && index2 > -1)){
      throw new Error('the value you are looking for is not present in the array.');
    }
    [this.arr[index1], this.arr[index2]] = [this.arr[index2], this.arr[index1]];
    return this;
  }

  deleteByIndexes(...selectedIndexes) {
    // removes items from array (changes the array length)
    const indexes = new Set([...selectedIndexes]);
    this.arr = this.arr.filter((_, idx) => !indexes.has(idx));
    return this;
  }

  deleteByValues(...selectedValues){
    const serializedSelection = [...selectedValues].map(item => this.serialize(item));
    const values = new Set([...serializedSelection]);
    this.arr = this.arr.filter(item => !values.has(this.serialize(item)));
    return this;
  }

  clearByIndexes(...selectedIndexes) {
    // replaces the values by undefined (keeps the array length)
    [...selectedIndexes].forEach(index => {
      if (this.arr[index] !== undefined){
        this.arr[index] = undefined;
      }
    });
    return this;
  }

  clearByValues(...selectedValues){
    const serializedSelection = [...selectedValues].map(item => this.serialize(item));
    const values = new Set([...serializedSelection]);
    this.arr = this.arr.map(item => !values.has(this.serialize(item)) ? item : undefined);
    return this;
  }

  replaceByIndex(index, newValue) {
    this.arr.splice(index, 1, newValue);
    return this;
  }

  replaceByIndexes(indexes = [], newValues = []) {
   indexes.forEach(index => {
     this.arr[index] = newValues[index];
   });
   return this;
  }

  replaceByValue(currentItem, newItem, replaceAllOccurences = true) {
    const arr = this.arr.slice();
    const indexes = replaceAllOccurences ? this.findAllOccurences(currentItem) : { value: [this.arr.indexOf(currentItem)] };
    if (indexes.value[0] > -1){
      indexes.value.forEach(index => {
        arr[index] = newItem;
      });
    }
    this.arr = arr;
    return this;
  }

  replaceByValues(currentItems = [], newItems = []) {
    if (currentItems.length !== newItems.length){
      throw new Error("can't replace values because the arrays that you have provided are not of equal size.");
    }
    currentItems.forEach((item , index) => {
      this.replaceByValue(item, newItems[index]);
    })
    return this;
  }

  toJSONObject(keys = [], values = []) {
    if (keys.length + values.length === 0) {
      return JSON.parse(JSON.stringify({...this.arr}));
    }
    if (!Array.isArray(keys) || !Array.isArray(values)){
      throw new Error("'keys' and 'values' must be arrays.")
    }
    if (keys.length !== values.length){
      throw new Error("array length of 'keys' and 'values' must be the same.")
    }
    const res = {};
    const _keys = JSON.parse(JSON.stringify(keys));
    const _values = JSON.parse(JSON.stringify(values));
    if (_keys.length !== _values.length){
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
    for(let i = 0; i < middleItem; i++){
        [this.arr[i], this.arr[len - 1 - i]] = [this.arr[len - 1 - i], this.arr[i]];
    }
    return this;
  }

  OR(item, callback) {
    // item can be either Array or primitive type
    if (!Array.isArray(item) && callback === undefined) {
      // OR: (item) => (arr[0] === item) || (arr[1] === item) || (arr[2] === item) || ...
      return this.arr.includes(item);
    }
    if (!Array.isArray(item) && callback !== undefined) {
      // OR: (item) => callback(arr[0],item) || callback(arr[1],item) || callback(arr[2],item) || ...
      return this.arr.some((arrItem) => callback(arrItem, item));
    }
    if (Array.isArray(item) && callback === undefined) {
      // OR: (item: []) => (arr[0] === item[0]) || (arr[1] === item[1]) || (arr[2] === item[2]) || ...
      checkLengths(item, this.arr);
      return this.arr.some((arrItem, index) => arrItem === item[index]);
    }
    if (Array.isArray(item) && callback !== undefined) {
      // OR: (item: [])  => callback(arr[0],item[0]) || callback(arr[1],item[1]) || callback(arr[2],item[2]) || ...
      checkLengths(item, this.arr);
      return this.arr.some((arrItem, index) => callback(arrItem, item[index]));
    }
  }

  AND(item, callback) {
    // item can be either Array or primitive type
    if (!Array.isArray(item) && callback === undefined) {
      // AND: (item) => (arr[0] === item) && (arr[1] === item) && (arr[2] === item) && ...
      return this.arr.every((arrItem) => arrItem === item);
    }
    if (!Array.isArray(item) && callback !== undefined) {
      // AND: (item) => callback(arr[0],item) && callback(arr[1],item) && callback(arr[2],item) && ...
      return this.arr.every((arrItem) => callback(arrItem, item));
    }
    if (Array.isArray(item) && callback === undefined) {
      // AND: (item: []) => (arr[0] === item[0]) && (arr[1] === item[1]) && (arr[2] === item[2]) && ...
      checkLengths(item, this.arr);
      return this.arr.every((arrItem, index) => arrItem === item[index]);
    }
    if (Array.isArray(item) && callback !== undefined) {
      // AND: (item: [])  => callback(arr[0],item[0]) && callback(arr[1],item[1]) && callback(arr[2],item[2]) && ...
      checkLengths(item, this.arr);
      return this.arr.every((arrItem, index) => callback(arrItem, item[index]));
    }
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
    return (!!this.arr.map((item) => !!item).reduce((a, b) => a ^ b, false)) ^ !!bool;
  }

  interpolate(arr2) {
    / * Linear Interpolation */
    // A     a
    // B     x = ?
    // C     c
    if (this.arr.length !== 3){
      throw new Error('left array length must be 3, representing the "starting", "middle" & "final" values respectively.');
    }
    if (arr2.length !== 3 || arr2[1] !== undefined){
      throw new Error('right array length must be 3, representing the [$starting_value, undefined, $final_value].');
    }
    const [A, B, C] = this.arr;
    const [a, , c] = arr2;
    return c - ((c - a) * (C - B)) / (C - A);
  }

  // TODO: sort by date
  sort({ order = "ascending", sortType = "QuickSort", sortBy }) {
    // order: "ascending" | "descending"
    // sortType: "QuickSort" | "MergeSort" | "InsertionSort" | "BubbleSort" | "RadixSort" | "HeapSort"
      let _sortBy, hasSortBy;

      if (sortBy !== undefined && typeof sortBy !== "function"){
        throw new Error('"sortBy" has to be a function.');
      }

      if (sortBy){
        _sortBy = sortBy;
        hasSortBy = true;
      } else {
        _sortBy = (item => item);
      }

      const types = [...new Set(this.arr.map(item => typeof _sortBy(item)))];
      if (types.length > 1) {
        throw new Error('cannot sort items of different types.');
      }

      if (types[0] !== "number" && types[0] !== "string") {
        throw new Error('cannot sort items of complex types. sorting is only possible on numbers or strings.')
      }

      const lookupTable = {}; // sortItem: mainItem
      const arr = this.arr.slice();
      const items = this.arr.map(_sortBy);
      items.forEach((item, index) => {
        lookupTable[item] = arr[index];
      })
      
      this.arr = sortify[sortType](items);
      if(order === "descending") this.reverse();

      const res = [];
      if (hasSortBy) {
        this.arr.map(item => {
          res.push(lookupTable[item]);
        });
        this.arr = res;
      }

      return this;
  }
}

const Arr = (arr, config) => new ArraySlayer(arr, config);

export default Arr;
