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
   * Parses a string representation (`hh:mm:ss`) of a time.
   *
   * @param text String representation.
   */
  static parse(text: string) {
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

    return new Time(hours, minutes, seconds);
  }
}
