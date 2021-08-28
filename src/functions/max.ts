import { Time } from '../time';

/**
 * Returns the max of the given times.
 *
 * @param src Time values to compare.
 */
export function max(src: Time[]) {
  let max: number | undefined;

  src.forEach((x) => {
    const value = x.valueOf();

    if (!max || value > max.valueOf()) {
      max = value;
    }
  });

  return max ? new Time({ seconds: max }) : undefined;
}
