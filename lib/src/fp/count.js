import { ISNAN } from "../../utils/helpers.js";

export default class Count {
    serialize = JSON.stringify;

    constructor(arr){
        this.arr = arr.slice();
    }
    
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
}

export const count = (item, arr) => new Count(arr).count(item);