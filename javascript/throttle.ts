/**
 * Throttle options for basic behavior
 * - n: max number of allowed calls
 * - p: time window (ms)
 */
type BasicThrottleOptions = {
  n: number;
  p: number;
};

/**
 * Throttle options for advanced behavior
 * - blockTime: initial block duration after violation
 * - exponent: multiplier for exponential backoff
 */
type AdvancedThrottleOptions = BasicThrottleOptions & {
  blockTime: number;
  exponent: number;
};

/**
 * Union type for throttle configuration
 * Advanced mode is enabled automatically if blockTime & exponent exist
 */
type ThrottleOptions = BasicThrottleOptions | AdvancedThrottleOptions;

/**
 * Unified throttle function
 *
 * Behavior:
 * - Basic throttle if only { n, p } are provided
 * - Advanced throttle with exponential backoff if { blockTime, exponent } are also provided
 */
export function throttle<T extends (...args: any[]) => void>(
  callback: T,
  options: ThrottleOptions,
): (...args: Parameters<T>) => void {
  const { n, p } = options;

  /**
   * Determines whether advanced throttling is enabled
   * This avoids passing explicit flags and keeps API clean
   */
  const isAdvanced = 'blockTime' in options && 'exponent' in options;

  /**
   * Holds the active timeout.
   * If not null, calls are currently blocked.
   */
  let timeout: ReturnType<typeof setTimeout> | null = null;

  /**
   * Tracks how many times the callback has been executed
   * within the current throttle window.
   */
  let callCount = 0;

  /**
   * Current block duration used only in advanced mode.
   * Grows exponentially on repeated violations.
   */
  let currentBlockTime = isAdvanced ? options.blockTime : 0;

  /**
   * The throttled function returned to the consumer
   */
  return function (...args: Parameters<T>): void {
    // If a timeout exists, we are currently throttled
    if (timeout) return;

    // Execute the callback immediately (leading execution)
    callback(...args);
    callCount++;

    /**
     * ─────────────── BASIC THROTTLE ───────────────
     * Allow n calls, then block for p milliseconds
     */
    if (!isAdvanced) {
      if (callCount >= n) {
        timeout = setTimeout(() => {
          timeout = null;
          callCount = 0;
        }, p);
      }
      return;
    }

    /**
     * ───────────── ADVANCED THROTTLE ─────────────
     * - If call limit reached → block for p and reset
     * - If violated early → block with exponential backoff
     */
    if (callCount >= n) {
      timeout = setTimeout(() => {
        timeout = null;
        callCount = 0;
        currentBlockTime = options.blockTime; // reset backoff
      }, p);
    } else {
      timeout = setTimeout(() => {
        timeout = null;
        currentBlockTime *= options.exponent; // exponential increase
      }, currentBlockTime);
    }
  };
}
