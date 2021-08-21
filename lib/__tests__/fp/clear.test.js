import { clear } from "../../src/fp/clear.js";

const arr = [1, 2, 9, 7, 8, 6, 2, 6, 2, 7];

describe('A suite for the "chunk" module:', () => {
  it("should return an array", () => {
    expect(Array.isArray(clear(arr))).toBe(true);
  });
  it("should be empty", () => {
    expect(clear(arr).length).toBe(0);
  });
  it("should be the same array (keeping reference)", () => {
    expect(clear(arr)).toEqual(arr);
  });
});
