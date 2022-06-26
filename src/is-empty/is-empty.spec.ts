import Time from '../time';
import isEmpty from './is-empty';

describe('isEmpty function', () => {
  test('should return true if time value is 0', () => {
    const result = isEmpty(new Time());

    expect(result).toBe(true);
  });

  test('should return false if time value is not 0', () => {
    const result = isEmpty(new Time(0, 1, 0));

    expect(result).toBe(false);
  });
});
