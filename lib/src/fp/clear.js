export default class Clear {
    constructor(arr){
        this.arr = arr;
    }
    get value(){
        return this.arr;
    }
    //removes all elements form arr (in place)
    clear() {
        this.arr.splice(0);
        return this;
    }
}

export const clear = (arr) => new Clear(arr).clear().value;