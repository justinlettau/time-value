import { Time } from './time';

describe('Time', () => {
  describe('constructor', () => {
    test('should return empty instance', () => {
      const time = new Time();

      expect(time.getHours()).toBe(0);
      expect(time.getMinutes()).toBe(0);
      expect(time.getSeconds()).toBe(0);
    });

    test('should return instance from (h, m, s)', () => {
      const time1 = new Time(4, 18, 25);

      expect(time1.getHours()).toBe(4);
      expect(time1.getMinutes()).toBe(18);
      expect(time1.getSeconds()).toBe(25);
    });

    test('should return instance from (h, m)', () => {
      const time1 = new Time(4, 18);

      expect(time1.getHours()).toBe(4);
      expect(time1.getMinutes()).toBe(18);
      expect(time1.getSeconds()).toBe(0);
    });

    test('should return instance from (h)', () => {
      const time1 = new Time(4);

      expect(time1.getHours()).toBe(4);
      expect(time1.getMinutes()).toBe(0);
      expect(time1.getSeconds()).toBe(0);
    });

    test('should return instance from { h, m, s }', () => {
      const time1 = new Time({ hours: 4, minutes: 18, seconds: 25 });

      expect(time1.getHours()).toBe(4);
      expect(time1.getMinutes()).toBe(18);
      expect(time1.getSeconds()).toBe(25);
    });

    test('should return instance from { h, m }', () => {
      const time1 = new Time({ hours: 4, minutes: 18 });

      expect(time1.getHours()).toBe(4);
      expect(time1.getMinutes()).toBe(18);
      expect(time1.getSeconds()).toBe(0);
    });

    test('should overflow minutes', () => {
      const time1 = new Time(4, 60);
      const time2 = new Time(4, 75);

      expect(time1.getHours()).toBe(5);
      expect(time1.getMinutes()).toBe(0);
      expect(time1.getSeconds()).toBe(0);

      expect(time2.getHours()).toBe(5);
      expect(time2.getMinutes()).toBe(15);
      expect(time2.getSeconds()).toBe(0);
    });

    test('should overflow seconds', () => {
      const time1 = new Time(4, 1, 60);
      const time2 = new Time(4, 1, 75);
      const time3 = new Time(4, 60, 60);
      const time4 = new Time(4, 60, 75);

      expect(time1.getHours()).toBe(4);
      expect(time1.getMinutes()).toBe(2);
      expect(time1.getSeconds()).toBe(0);

      expect(time2.getHours()).toBe(4);
      expect(time2.getMinutes()).toBe(2);
      expect(time2.getSeconds()).toBe(15);

      expect(time3.getHours()).toBe(5);
      expect(time3.getMinutes()).toBe(1);
      expect(time3.getSeconds()).toBe(0);

      expect(time4.getHours()).toBe(5);
      expect(time4.getMinutes()).toBe(1);
      expect(time4.getSeconds()).toBe(15);
    });
  });

  describe('add method', () => {
    test('should return new instance', () => {
      const time1 = new Time();
      const time2 = new Time();
      const time3 = time1.add(time2);

      expect(time3 === time1).toBe(false);
      expect(time3 === time2).toBe(false);
    });

    test('should add values', () => {
      const time1 = new Time(3, 32, 15);
      const time2 = new Time(2, 5, 10);
      const time3 = time1.add(time2);

      expect(time3.getHours()).toBe(5);
      expect(time3.getMinutes()).toBe(37);
      expect(time3.getSeconds()).toBe(25);
    });
  });

  describe('sub method', () => {
    test('should return new instance', () => {
      const time1 = new Time();
      const time2 = new Time();
      const time3 = time1.sub(time2);

      expect(time3 === time1).toBe(false);
      expect(time3 === time2).toBe(false);
    });

    test('should subtract values', () => {
      const time1 = new Time(3, 32, 15);
      const time2 = new Time(2, 5, 10);
      const time3 = time1.sub(time2);

      expect(time3.getHours()).toBe(1);
      expect(time3.getMinutes()).toBe(27);
      expect(time3.getSeconds()).toBe(5);
    });
  });

  describe('valueOf method', () => {
    test('should return total seconds', () => {
      const time1 = new Time();
      const time2 = new Time(1, 25, 13);
      const time3 = new Time(2, 45);
      const time4 = new Time(-5, 5, 3);
      const time5 = new Time(-9, 50);

      expect(time1.valueOf()).toBe(0);
      expect(time2.valueOf()).toBe(5113);
      expect(time3.valueOf()).toBe(9900);
      expect(time4.valueOf()).toBe(-18303);
      expect(time5.valueOf()).toBe(-35400);
    });
  });

  describe('toString method', () => {
    test('should return formatted string', () => {
      const time1 = new Time(1, 25, 13);
      const time2 = new Time(2, 45);
      const time3 = new Time(-5, 5, 3);
      const time4 = new Time(-9, 50);

      expect(time1.toString()).toBe('01:25:13');
      expect(time2.toString()).toBe('02:45:00');
      expect(time3.toString()).toBe('-05:05:03');
      expect(time4.toString()).toBe('-09:50:00');
    });
  });
});
