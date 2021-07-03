export default class Chunk {
  constructor(arr) {
    this.arr = arr.slice();
  }
  get value() {
    return this.arr;
  }
  chunk(size) {
    const res = [];
    const count = Math.ceil(this.arr.length / size);
    for (let i = 0; i < count; i++) {
      res.push(this.arr.slice(i * size, i * size + size));
    }
    this.arr = res;
    return this;
  }
}

export const chunk = (size, arr) => new Chunk(arr).chunk(size).value;
