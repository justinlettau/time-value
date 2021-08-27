import { Time } from './time';

describe('Time', () => {
  describe('constructor', () => {
    test('should return empty instance', () => {
      const time = new Time();

      expect(time.getHours()).toBe(0);
      expect(time.getMinutes()).toBe(0);
      expect(time.getSeconds()).toBe(0);
    });

    test('should return instance from hh:mm:ss', () => {
      const time1 = new Time(4, 18, 25);

      expect(time1.getHours()).toBe(4);
      expect(time1.getMinutes()).toBe(18);
      expect(time1.getSeconds()).toBe(25);
    });

    test('should return instance from hh:mm', () => {
      const time1 = new Time(4, 18);

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

  describe('parse method', () => {
    test('should return instance from hh:mm:ss', () => {
      const time = Time.parse('02:30:08');

      expect(time.getHours()).toBe(2);
      expect(time.getMinutes()).toBe(30);
      expect(time.getSeconds()).toBe(8);
    });

    test('should return instance from hh:mm', () => {
      const time = Time.parse('02:30');

      expect(time.getHours()).toBe(2);
      expect(time.getMinutes()).toBe(30);
      expect(time.getSeconds()).toBe(0);
    });

    test('should return instance from -hh:mm:ss', () => {
      const time = Time.parse('-02:30:08');

      expect(time.getHours()).toBe(-2);
      expect(time.getMinutes()).toBe(-30);
      expect(time.getSeconds()).toBe(-8);
    });

    test('should return instance from -hh:mm:ss', () => {
      const time = Time.parse('-02:30');

      expect(time.getHours()).toBe(-2);
      expect(time.getMinutes()).toBe(-30);
      expect(time.getSeconds()).toBe(-0);
    });

    test('should throw error on invalid value', () => {
      expect(() => Time.parse('invalid')).toThrow('Could not parse "invalid"');
    });
  });

  describe('sum method', () => {
    test('should sum values', () => {
      const time = Time.sum(['05:45:11', '-03:08:02', '01:42:40']);

      expect(time.getHours()).toBe(4);
      expect(time.getMinutes()).toBe(19);
      expect(time.getSeconds()).toBe(49);
    });

    test('should sum values from hh:mm:ss', () => {
      const time = Time.sum(['05:45:11', '03:08:02', '01:42:40']);

      expect(time.getHours()).toBe(10);
      expect(time.getMinutes()).toBe(35);
      expect(time.getSeconds()).toBe(53);
    });

    test('should sum values from -hh:mm:ss', () => {
      const time = Time.sum(['-05:45:11', '-03:08:02', '-01:42:40']);

      expect(time.getHours()).toBe(-10);
      expect(time.getMinutes()).toBe(-35);
      expect(time.getSeconds()).toBe(-53);
    });

    test('should ignore null values', () => {
      const time = Time.sum(['03:11:23', null, '01:12:17']);

      expect(time.getHours()).toBe(4);
      expect(time.getMinutes()).toBe(23);
      expect(time.getSeconds()).toBe(40);
    });

    test('should throw error on invalid value', () => {
      expect(() => Time.sum(['05:45:11', 'invalid'])).toThrow(
        'Could not parse "invalid"'
      );
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
      const time2 = Time.parse('01:25:13');
      const time3 = Time.parse('02:45');
      const time4 = Time.parse('-05:05:03');
      const time5 = Time.parse('-09:50');

      expect(time1.valueOf()).toBe(0);
      expect(time2.valueOf()).toBe(5113);
      expect(time3.valueOf()).toBe(9900);
      expect(time4.valueOf()).toBe(-18303);
      expect(time5.valueOf()).toBe(-35400);
    });
  });

  describe('toString method', () => {
    test('should return formatted string', () => {
      const time1 = Time.parse('01:25:13');
      const time2 = Time.parse('02:45');
      const time3 = Time.parse('-05:05:03');
      const time4 = Time.parse('-09:50');

      expect(time1.toString()).toBe('01:25:13');
      expect(time2.toString()).toBe('02:45:00');
      expect(time3.toString()).toBe('-05:05:03');
      expect(time4.toString()).toBe('-09:50:00');
    });
  });
});
