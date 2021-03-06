import ArraySlayer from "../../src/arraySlayer";

const arr = [1, 2, 9, 7, 8, 6, 2, 6, 2, 7];

describe('A suite for the "chunk" method of the main bundle:', () => {
  it("should return an array", () => {
    expect(Array.isArray(ArraySlayer(arr).chunk(2).value)).toBe(true);
  });
  it("should return an array of arrays", () => {
    expect(
      ArraySlayer(arr)
        .chunk(2)
        .value.every((item) => Array.isArray(item))
    ).toBe(true);
  });
  it("should return [] when array is empty", () => {
    expect(ArraySlayer([]).chunk(5).value.length).toBe(0);
  });
  it("should throw if size is 0", () => {
    expect(() => ArraySlayer(arr).chunk(0).value).toThrow("size should be defined as a positive value");
  });
  it("should throw if size is falsy", () => {
    expect(() => ArraySlayer(arr).chunk(NaN).value).toThrow("size should be defined as a positive value");
  });
  it("should throw if parameter is not array", () => {
    expect(() => ArraySlayer("sample string").chunk(5).value).toThrow("parameter is not Array");
  });
  it("should return the correct result for chunking into arrays of 2 items", () => {
    expect(ArraySlayer(arr).chunk(2).value).toEqual([
      [1, 2],
      [9, 7],
      [8, 6],
      [2, 6],
      [2, 7],
    ]);
  });
  it("should return the correct result for chunking into arrays of 3 items", () => {
    expect(ArraySlayer(arr).chunk(3).value).toEqual([[1, 2, 9], [7, 8, 6], [2, 6, 2], [7]]);
  });
  it("should return the correct result for chunking into arrays of 5 items", () => {
    expect(ArraySlayer(arr).chunk(5).value).toEqual([
      [1, 2, 9, 7, 8],
      [6, 2, 6, 2, 7],
    ]);
  });
  it("should return last item as [7] in chunking to 3 parts", () => {
    expect(ArraySlayer(arr).chunk(3).value[3]).toEqual([7]);
  });
});
