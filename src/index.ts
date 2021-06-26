/**
 * Represents an amount of time.
 */
export class Time {
  constructor(hours = 0, minutes = 0, seconds = 0) {
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

    this._hours = hours;
    this._minutes = minutes;
    this._seconds = seconds;
    this.isNegative = isNegative;
  }

  private readonly _hours: number;
  private readonly _minutes: number;
  private readonly _seconds: number;
  private readonly isNegative: boolean;

  /**
   * Get hours.
   */
  getHours() {
    return this._hours;
  }

  /**
   * Get minutes.
   */
  getMinutes() {
    return this._minutes;
  }

  /**
   * Get seconds.
   */
  getSeconds() {
    return this._seconds;
  }

  /**
   * Add a time value.
   *
   * @param value Time value to add.
   */
  add(value: Time) {
    const hours = this._hours + value._hours;
    const minutes = this._minutes + value._minutes;
    const seconds = this._seconds + value._seconds;

    return new Time(hours, minutes, seconds);
  }

  /**
   * Subtract a time value.
   *
   * @param value Time value to subtract.
   */
  sub(value: Time) {
    const hours = this._hours - value._hours;
    const minutes = this._minutes - value._minutes;
    const seconds = this._seconds - value._seconds;

    return new Time(hours, minutes, seconds);
  }

  /**
   * Returns the primitive value of a `Time`, in seconds.
   */
  valueOf() {
    let value = 0;

    if (this._hours) {
      value += this._hours * 60 * 60;
    }

    if (this._minutes) {
      value += this._minutes * 60;
    }

    if (this._seconds) {
      value += this._seconds;
    }

    return value;
  }

  /**
   * Format time as `hh:mm:ss`.
   */
  toString() {
    const sign = this.isNegative ? '-' : '';
    const time = [this._hours, this._minutes, this._seconds]
      .map((x) => Math.abs(x).toString().padStart(2, '0'))
      .join(':');

    return sign + time;
  }

  /**
   * Parses a time string (`hh:mm:ss`) into it's parts.
   *
   * @param text String value.
   */
  private static _parse(text: string) {
    let isNegative = false;

    if (text.startsWith('-')) {
      isNegative = true;
      text = text.substring(1);
    }

    const parts = text.split(':');

    if (parts.length < 2 || parts.length > 3) {
      throw new Error(`Could not parse "${text}"`);
    }

    let hours = parseInt(parts[0]) || 0;
    let minutes = parseInt(parts[1]) || 0;
    let seconds = parseInt(parts[2]) || 0;

    if (isNegative) {
      hours = -hours;
      minutes = -minutes;
      seconds = -seconds;
    }

    return {
      hours,
      minutes,
      seconds,
    };
  }

  /**
   * Parses a time string (`hh:mm:ss`) into an instance of Time.
   *
   * @param text String value.
   */
  static parse(text: string) {
    const { hours, minutes, seconds } = Time._parse(text);

    return new Time(hours, minutes, seconds);
  }

  /**
   * Parse a collection of time strings (`hh:mm:ss`) and sum their values into one instance of Time.
   *
   * @param texts Collection of string values.
   */
  static sum(texts: (string | null)[]) {
    let hours = 0;
    let minutes = 0;
    let seconds = 0;

    texts
      .filter((value) => value !== null)
      .forEach((value) => {
        const item = Time._parse(value as string);

        hours += item.hours;
        minutes += item.minutes;
        seconds += item.seconds;
      });

    return new Time(hours, minutes, seconds);
  }
}
