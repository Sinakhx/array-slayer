// A ∩ B ∩ C ...
export const intersection = (...arrays) => {
  return [...arrays].reduce((a, b) => {
    const setB = new Set(b);
    return a.filter((c) => setB.has(c));
  });
};
