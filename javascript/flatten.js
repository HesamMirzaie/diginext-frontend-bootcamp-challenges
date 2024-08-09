/**
 * Returns a flatten object. Remember that the level of nesting is not specified.
 * Use case. Form creation for nested objects or lists.
 *
 * @param {object} object An object that may be nested.
 *
 * @returns flatten object.
 *
 * @example flatten({"a": {"b": {"c": "d"}}}) => {"a.b.c": "d"}
 *
 */
function flatten(object) {
  let result = {};

  for (const i in object) {
    if (typeof object[i] === 'object' && typeof object[i] !== 'array') {
      const temp = flatten(object[i]);
      for (const j in temp) {
        result[i + '.' + j] = temp[j];
      }
    } else {
      result[i] = object[i];
    }
  }
  return result;
}

const obj = {
  a: 1,
  b: [2, 3],
  c: {
    d: 4,
    e: [5, 6],
    f: {
      g: 7,
    },
  },
};
const result = flatten(obj);
console.log(result);

/**
 * Returns a nested object. Remember that the level of nesting is not specified.
 *
 * @param {object} object A flat object
 *
 * @returns maybe nested object
 *
 * @example revertFlatten({"a.b.c": "d"}) => {"a": {"b": {"c": "d"}}}
 *
 */
function revertFlatten(object) {
  let result = {};

  for (const key in object) {
    const keys = key.split('.'); // Split the key by '.'
    let current = result;

    // Iterate through all keys except the last one
    for (let i = 0; i < keys.length - 1; i++) {
      if (!current[keys[i]]) {
        current[keys[i]] = {}; // Create a new nested object if it doesn't exist
      }
      current = current[keys[i]]; // Move to the next level
    }

    // Set the value at the deepest level
    current[keys[keys.length - 1]] = object[key];
  }

  return result;
}
