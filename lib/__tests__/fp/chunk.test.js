import { chunk } from "../../src/fp/chunk.js";

const arr = [1, 2, 9, 7, 8, 6, 2, 6, 2, 7];

describe('A suite for the "chunk" module:', () => {
  it("should return last item as a seperate chunk: returning 7", () => {
    expect(chunk(3, arr)[3][0]).toBe(7);
  });
});
