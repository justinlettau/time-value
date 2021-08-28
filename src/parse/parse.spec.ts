import { parse } from './parse';

describe('parse function', () => {
  test('should return instance from hh:mm:ss', () => {
    const time = parse('02:30:08');

    expect(time.getHours()).toBe(2);
    expect(time.getMinutes()).toBe(30);
    expect(time.getSeconds()).toBe(8);
  });

  test('should return instance from hh:mm', () => {
    const time = parse('02:30');

    expect(time.getHours()).toBe(2);
    expect(time.getMinutes()).toBe(30);
    expect(time.getSeconds()).toBe(0);
  });

  test('should return instance from -hh:mm:ss', () => {
    const time = parse('-02:30:08');

    expect(time.getHours()).toBe(-2);
    expect(time.getMinutes()).toBe(-30);
    expect(time.getSeconds()).toBe(-8);
  });

  test('should return instance from -hh:mm:ss', () => {
    const time = parse('-02:30');

    expect(time.getHours()).toBe(-2);
    expect(time.getMinutes()).toBe(-30);
    expect(time.getSeconds()).toBe(-0);
  });

  test('should throw error on invalid value', () => {
    expect(() => parse('invalid')).toThrow('Could not parse "invalid"');
  });
});
