/**
 * Creates a throttled function that limits the number of times the callback can be called within a specified period.
 *
 * @param {function} callback The callback method that will be called if conditions are met.
 * @param {number} n The maximum number of callback calls permitted in the specified period.
 * @param {number} p The time period (in milliseconds) during which the callback count is limited.
 * @returns {function} A throttled version of the original callback.
 */
function throttle(callback, n, p) {
  let timeout = null;
  let callCount = 0;

  return () => {
    if (!timeout) {
      callback();
      callCount += 1;

      if (callCount >= n) {
        timeout = setTimeout(() => {
          timeout = null;
          callCount = 0;
        }, p);
      }
    }
  };
}

// Example usage:
const myCallback = () => {
  console.log('Callback executed!');
};

const throttledCallback = throttle(myCallback, 3, 1000); // Allow up to 3 calls per second

// Call the throttled function (e.g., in response to user interactions)
throttledCallback();

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
  // TODO: Implement here
}
