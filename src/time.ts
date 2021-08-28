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
}
