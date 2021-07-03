import { ISNAN } from "../../utils/helpers.js";

export const count = (item, arr) => {
  let amount = 0;

  if (item === null) {
    arr.forEach((arrItem) => {
      if (arrItem === null) {
        amount += 1;
      }
    });
  } else if (ISNAN(item)) {
    arr.forEach((arrItem) => {
      if (ISNAN(arrItem)) {
        amount += 1;
      }
    });
  } else if (typeof item === "number" || typeof item === "string") {
    arr.forEach((arrItem) => {
      if (arrItem === item) {
        amount += 1;
      }
    });
  } else {
    arr.forEach((arrItem) => {
      if (JSON.stringify(item) === JSON.stringify(arrItem)) {
        amount += 1;
      }
    });
  }
  return amount;
}
