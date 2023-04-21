/**
 * accumulate - transform array of objects to object with accumulated values
 * @param {string[]} [config=[]] - the array of strings
 * @param {Object[]} [data=[]] - the array of objects
 * @returns {Object}
 */
export const accumulate = (config = [], data = []) => {
  const result = {};

  for (const obj of data) {
    for (const value of config) {
      if (obj[value] === undefined) continue;

      if (!result[value]) {
        result[value] = [];
      }

      result[value].push(obj[value]);
    }
  }

  return result;
};
