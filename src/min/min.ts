import Time from '../time.js';

/**
 * Returns the min of the given times.
 *
 * @param src Time values to compare.
 */
export default function min(src: Time[]) {
  let min: number | undefined;

  src.forEach((x) => {
    const value = x.valueOf();

    if (!min || value < min.valueOf()) {
      min = value;
    }
  });

  return min ? new Time({ seconds: min }) : undefined;
}
