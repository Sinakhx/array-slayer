import { chunk } from "../../src/fp/chunk.js";

const arr = [1, 2, 9, 7, 8, 6, 2, 6, 2];
const result = chunk(3, array);
console.log(result); // -> [ [ 1, 2, 9 ], [ 7, 8, 6 ], [ 2, 6, 2 ], [ 7 ] ]

describe('A suite for the "chunk" module:', () => {
  it("should chunk the array into parts", () => {
    expect(chunk(3, array)).toBe([ [ 1, 2, 9 ], [ 7, 8, 6 ], [ 2, 6, 2 ], [ 7 ] ]);
  });
});
