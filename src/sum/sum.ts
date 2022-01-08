import Time from '../time.js';

/**
 * Returns the sum of the given times.
 *
 * @param src Time values to compare.
 */
export default function sum(src: Time[]) {
  let total = 0;

  src.forEach((x) => {
    total += x.valueOf();
  });

  return new Time({ seconds: total });
}
