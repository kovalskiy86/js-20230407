/**
 * uniq - returns array of uniq values:
 * @param {*[]} arr - the array of primitive values
 * @returns {*[]} - the new array with uniq values
 */
export function uniq(arr) {
  return [...new Set(arr)]; // [1, 2, 2, 2, 3, 3, 4] => [1, 2, 3, 4]
}

export function uniq1(arr = []) {
  const obj = {};

  arr.forEach(item => {
    obj[item] = item;
  });

  return Object.values(obj);
}

export function uniq2(arr) {
  return Array.from(new Set(arr), item => {
    return item * 2;
  });
}

