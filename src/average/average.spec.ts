import Time from '../time';
import average from './average';

describe('average function', () => {
  test('should return average value', () => {
    const result = average([
      new Time(8, 3, 10),
      new Time(1, 0, 45),
      new Time(5, 51, 6),
    ]);

    expect(result.toString()).toBe('04:58:20');
  });

  test('should return empty value when src is empty', () => {
    const result = average([]);

    expect(result.toString()).toBe('00:00:00');
  });
});
