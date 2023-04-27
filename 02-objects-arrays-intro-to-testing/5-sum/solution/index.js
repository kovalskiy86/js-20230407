/**
 * Sum - returns sum of arguments if they can be converted to a number
 * @param {number} n value
 * @returns {number | function}
 */
export function sum (n) {
  function innerSum (value = 0) {
    innerSum.accum += value;

    return innerSum;
  }

  innerSum.accum = 0;

  innerSum[Symbol.toPrimitive] = () => {
    return innerSum.accum;
  };

  return innerSum(n);
}
