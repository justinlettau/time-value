import Time from '../time';
import min from './min';

describe('min function', () => {
  test('should return min value', () => {
    const result = min([
      new Time(8, 3, 10),
      new Time(1, 0, 45),
      new Time(5, 51, 6),
    ]);

    expect(result.toString()).toBe('01:00:45');
  });

  test('should return empty value when src is empty', () => {
    const result = min([]);

    expect(result.toString()).toBe('00:00:00');
  });
});
