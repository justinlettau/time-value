import { Time } from '../time';

/**
 * Returns the max of the given times.
 *
 * @param src Time values to compare.
 */
export function max(src: Time[]) {
  let max: Time | undefined;

  src.forEach((x) => {
    if (!max || x.valueOf() > max.valueOf()) {
      max = x;
    }
  });

  return max;
}
