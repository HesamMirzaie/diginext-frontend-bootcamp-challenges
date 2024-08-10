/**
 *
 * This function will get 2 objects and returns the changes in the format provided at the end of the file.
 * Use case: Git file diff
 *
 * @param {object} oldObject
 * @param {object} newObject
 *
 * @returns diff object.
 */

// {
//     "key1": {
//         "type": "modified",
//         "oldValue": "old value",
//         "newValue": "new value"
//     },
//     "key 2": {
//         "type": "added",
//         "newValue": "new value"
//     },
//     "key 3": {
//         "type": "removed",
//         "oldValue": "old value"
//     },
//     ...
// }
function jsonDiff(oldObject, newObject) {
  let obj = {};
  for (let item in oldObject) {
    if (oldObject[item] !== newObject[item]) {
      obj[item] = {
        type: 'modified',
        oldValue: oldObject[item],
        newValue: newObject[item],
      };
    }
    if (!Object.hasOwnProperty.call(newObject, item)) {
      obj[item] = {
        type: 'removed',
        oldValue: oldObject[item],
      };
    }
  }
  for (let item in newObject) {
    if (!Object.hasOwnProperty.call(oldObject, item)) {
      obj[item] = {
        type: 'added',
        newValue: newObject[item],
      };
    }
  }
  return obj;
}

const oldObject = {
  key1: 'old value',
  key3: 'old value',
};

const newObject = {
  key1: 'new value',
  key2: 'new value',
};

const diffResult = jsonDiff(oldObject, newObject);
console.log(diffResult);
