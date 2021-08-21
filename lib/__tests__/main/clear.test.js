import ArraySlayer from "../../src/arraySlayer";

const arr = [1, 2, 9, 7, 8, 6, 2, 6, 2, 7];
const result = ArraySlayer(arr).clear().value;

describe('A suite for the "chunk" method of the main bundle:', () => {
  it("should return an array", () => {
    expect(Array.isArray(result)).toBe(true);
  });
  it("should be empty", () => {
    expect(result.length).toBe(0);
  });
  it("should be the same array (keeping reference)", () => {
    expect(result).toEqual(arr);
  });
});
