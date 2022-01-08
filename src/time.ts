import { TimeParts } from './time-parts.js';

/**
 * Represents an amount of time.
 */
export default class Time {
  constructor(parts?: TimeParts);
  constructor(hours?: number, minutes?: number, seconds?: number);
  constructor(...args: unknown[]) {
    let hours: number;
    let minutes: number;
    let seconds: number;

    if (args.length === 1 && typeof args[0] === 'object') {
      const parts = args[0] as TimeParts;

      hours = parts?.hours || 0;
      minutes = parts?.minutes || 0;
      seconds = parts?.seconds || 0;
    } else {
      const parts = args as (number | undefined)[];

      hours = parts[0] || 0;
      minutes = parts[1] || 0;
      seconds = parts[2] || 0;
    }

    const isNegative = hours < 0 || minutes < 0 || seconds < 0;

    hours = Math.abs(hours);
    minutes = Math.abs(minutes);
    seconds = Math.abs(seconds);

    if (seconds >= 60) {
      minutes += Math.floor(seconds / 60);
      seconds %= 60;
    }

    if (minutes >= 60) {
      hours += Math.floor(minutes / 60);
      minutes %= 60;
    }

    if (isNegative) {
      hours = -hours;
      minutes = -minutes;
      seconds = -seconds;
    }

    this.hours = hours;
    this.minutes = minutes;
    this.seconds = seconds;
    this.isNegative = isNegative;
  }

  private readonly hours: number;
  private readonly minutes: number;
  private readonly seconds: number;
  private readonly isNegative: boolean;

  /**
   * Get hours.
   */
  getHours() {
    return this.hours;
  }

  /**
   * Get minutes.
   */
  getMinutes() {
    return this.minutes;
  }

  /**
   * Get seconds.
   */
  getSeconds() {
    return this.seconds;
  }

  /**
   * Returns the primitive value of a `Time`, in seconds.
   */
  valueOf() {
    let value = 0;

    if (this.hours) {
      value += this.hours * 60 * 60;
    }

    if (this.minutes) {
      value += this.minutes * 60;
    }

    if (this.seconds) {
      value += this.seconds;
    }

    return value;
  }

  /**
   * Format time as `hh:mm:ss`.
   */
  toString() {
    const sign = this.isNegative ? '-' : '';
    const time = [this.hours, this.minutes, this.seconds]
      .map((x) => Math.abs(x).toString().padStart(2, '0'))
      .join(':');

    return sign + time;
  }
}
