import Time from '../time.js';

/**
 * Returns true if the time value is empty ('00:00:00').
 *
 * @param src Time value to check.
 */
export default function isEmpty(src: Time) {
  return src.valueOf() === 0;
}
