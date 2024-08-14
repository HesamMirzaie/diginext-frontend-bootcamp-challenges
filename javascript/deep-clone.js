// /**
//  * Creates a deep copy of the arg. Remember that the arg can be nested with infinite levels.
//  * Use case: List copy. Object copy.
//  *
//  * @param {JSON serializable value} arg Any JSON serializable value
//  *
//  * @returns An Literal exact copy of the arg
//  */
const deepClone = function (arg) {
  const newArr = [];
  for (item of arg) {
    newArr.push(item);
  }
  newArr[0].name = 'Emad';
  return newArr;
};

const arr = [
  {
    name: 'Hesam',
    toDoes: [
      { id: 1, task: 'Study', date: new Date() },
      { id: 2, task: 'Study', date: new Date() },
      { id: 3, task: 'Study', date: new Date() },
    ],
  },
  {
    name: 'Alex',
    toDoes: [
      { id: 4, task: 'Study', date: new Date() },
      { id: 5, task: 'Study', date: new Date() },
      { id: 6, task: 'Study', date: new Date() },
    ],
  },
  {
    name: 'Farhad',
    toDoes: [
      { id: 7, task: 'Study', date: new Date() },
      { id: 8, task: 'Study', date: new Date() },
      { id: 9, task: 'Study', date: new Date() },
    ],
  },
];
console.log(arr);
console.log(deepClone(arr));
