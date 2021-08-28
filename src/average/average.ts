import Time from '../time';

/**
 * Returns the average of the given times.
 *
 * @param src Time values to compare.
 */
export default function average(src: Time[]) {
  let total = 0;

  src.forEach((x) => {
    total += x.valueOf();
  });

  const seconds = Math.round(total / src.length);
  return new Time({ seconds });
}
