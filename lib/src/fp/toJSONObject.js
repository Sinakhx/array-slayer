export const toJSONObject = (keys = [], values = []) => {
  if (!Array.isArray(keys) || !Array.isArray(values)) {
    throw new Error("'keys' and 'values' must be arrays.");
  }
  if (keys.length !== values.length) {
    throw new Error("array length of 'keys' and 'values' must be the same.");
  }
  const res = {};
  const _keys = JSON.parse(JSON.stringify(keys));
  const _values = JSON.parse(JSON.stringify(values));
  if (_keys.length !== _values.length) {
    throw new Error("objects' inner values must be of primitive types.");
  }
  _keys.forEach((key, index) => {
    res[key] = _values[index];
  });
  return res;
};
