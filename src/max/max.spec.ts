import Time from '../time';
import max from './max';

describe('max function', () => {
  test('should return max value', () => {
    const result = max([
      new Time(8, 3, 10),
      new Time(1, 0, 45),
      new Time(5, 51, 6),
    ]);

    expect(result.toString()).toBe('08:03:10');
  });

  test('should return empty value when src is empty', () => {
    const result = max([]);

    expect(result.toString()).toBe('00:00:00');
  });
});
