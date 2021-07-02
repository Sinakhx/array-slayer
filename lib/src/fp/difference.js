export default class Difference {
    constructor(arr){
        this.arr = arr.slice();
    }
    get value(){
        return this.arr;
    }
    // A - B
    difference(arr2) {
        const arr2Set = new Set(arr2);
        this.arr = this.arr.filter((arrItem) => !arr2Set.has(arrItem));
        return this;
    }
}

export const difference = (arr1, arr2) => new Difference(arr1).difference(arr2).value;