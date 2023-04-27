import { sum } from './solution/index';

describe('objects-arrays-intro-to-testing/sum', () => {
  it('should return sum of positive numbers', () => {
    expect(+sum(1)(2)).toEqual(3);
    expect(+sum(1)(2)(3)).toEqual(6);
  });

  it('should return sum of negative numbers', () => {
    expect(+sum(0)(-0)).toEqual(0);
    expect(+sum(-1)(-2)(-3)).toEqual(-6);
    expect(+sum(1)(8)(-3)).toEqual(6);
  });

  it('should return 0 if arguments did not pass', () => {
    expect(+sum()).toEqual(0);
    expect(+sum()()).toEqual(0);
  });

  it('should return sum of arguments in operations which converts value to string data type', () => {
    expect(sum(1)(2)(3) + '1').toEqual('61');
  });
});
