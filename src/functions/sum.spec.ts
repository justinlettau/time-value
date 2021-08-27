import { Time } from '../time';
import { sum } from './sum';

describe('sum function', () => {
  test('should return sum value', () => {
    const result = sum([
      new Time(8, 3, 10),
      new Time(1, 0, 45),
      new Time(5, 51, 6),
    ]);

    expect(result.toString()).toBe('14:55:01');
  });
});
