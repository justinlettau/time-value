import { Time } from '../time';

/**
 * Returns the min of the given times.
 *
 * @param src Time values to compare.
 */
export function min(src: Time[]) {
  let min: Time | undefined;

  src.forEach((x) => {
    if (!min || x.valueOf() < min.valueOf()) {
      min = x;
    }
  });

  return min;
}
