/**
 * This method can get infinity numbers as args and can call for infinity time.
 * The result of the last call should be parsable as both number or string.
 * Use case: No use case. Just sth fun :)))))
 */

function add(...args) {
  const sum = args.reduce((acc, curr) => acc + curr, 0);
  function innerAdd(...innerArgs) {
    if (innerArgs.length === 0) return sum;
    const newSum = sum + innerArgs.reduce((acc, curr) => acc + curr, 0);
    return add(newSum);
  }

  console.log(sum);
  return innerAdd;
}

// Call Examples
console.log(add(1, 2)); // Output: 3
console.log('------------------------');
console.log(add(1, 2)(3)); // Output: 6
console.log('------------------------');
console.log(add(1, 2)(3)(4, 5)); // Output: 15
console.log('------------------------');
console.log(add(1, 2)(3)(4, 5)(6)); // Output: 21
