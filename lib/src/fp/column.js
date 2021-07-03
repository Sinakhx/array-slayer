export default class Column {
    constructor(arr){
        this.arr = arr.slice();
    }

    get value(){
        return this.arr;
    }
    
    column(colIndex, key) {
        if (typeof colIndex === "function") {
          this.arr = this.arr.map(colIndex);
          return this;
        }
        if (!!key && typeof key === "string") {
          const keys = key.split(".");
          this.arr = this.arr.map((item) => keys.reduce((a, b) => a[b], item[colIndex]));
          return this;
        }
        if (!!key) {
          throw new Error("key has to be of type 'string'");
        }
        this.arr = this.arr.map((item) => item[colIndex]);
        return this;
    }
}

export const column = (arr, colIndex, key) => new Column(arr).column(colIndex, key).value;