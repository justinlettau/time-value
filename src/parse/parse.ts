import Time from '../time';

/**
 * Parses a time string (`hh:mm:ss`) into it's parts.
 *
 * @param src String value.
 */
export default function parse(src: string | null) {
  let isNegative = false;

  if (src == null) {
    return new Time();
  }

  if (src.startsWith('-')) {
    isNegative = true;
    src = src.substring(1);
  }

  const parts = src.split(':');

  if (parts.length < 2 || parts.length > 3) {
    throw new Error(`Could not parse "${src}"`);
  }

  let hours = parseInt(parts[0]) || 0;
  let minutes = parseInt(parts[1]) || 0;
  let seconds = parseInt(parts[2]) || 0;

  if (isNegative) {
    hours = -hours;
    minutes = -minutes;
    seconds = -seconds;
  }

  return new Time(hours, minutes, seconds);
}
