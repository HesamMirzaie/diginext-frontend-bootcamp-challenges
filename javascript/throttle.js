// function throttle(callback, n, p) {
//   let timeout = null;
//   let callCount = 0;

//   return () => {
//     if (!timeout) {
//       callback();
//       callCount += 1;

//       if (callCount >= n) {
//         timeout = setTimeout(() => {
//           timeout = null;
//           callCount = 0;
//         }, p);
//       }
//     }
//   };
// }

// const throttledCallback = throttle(myCallback, 3, 1000);
// throttledCallback();

/**
 * Level 2
 *
 * This method will call the callback only n times in the given period.
 * The difference between this and the throttle method is that if the violations of the restriction is repetitive,
 * the n should increase exponentially.
 *
 * @param {function} callback the callback method that will be called if conditions happen.
 * @param {number} n the number of callback calls that is permitted in the p period.
 * @param {number} p the period of time that we should apply the n count on.
 * @param {number} blockTime the period of time that we should block the function from getting called.
 * @param {number} exponent the exponent value that will apply on blockTime on repetitive throttle violation.
 *
 *
 * @returns {function}
 */
function advancedThrottle(callback, n, p, blockTime, exponent) {
  let timeout = null;
  let callCount = 0;
  return () => {
    if (!timeout) {
      setTimeout(() => {
        callback();
        callCount += 1;
      }, blockTime * exponent);
      if (callCount >= n) {
        timeout = setTimeout(() => {
          timeout = null;
          callCount = 0;
        }, p);
      }
    }
    exponent = blockTime * exponent;
  };
}

const callback = () => console.log(12);

const throttledCallback = advancedThrottle(callback, 3, 10, 10, 2);

btn.addEventListener('click', throttledCallback());
