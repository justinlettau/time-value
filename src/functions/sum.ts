import { Time } from '../time';

/**
 * Returns the sum of the given times.
 *
 * @param src Time values to compare.
 */
export function sum(src: Time[]) {
  let total = 0;

  src.forEach((x) => {
    total += x.valueOf();
  });

  return new Time(0, 0, total);
}
