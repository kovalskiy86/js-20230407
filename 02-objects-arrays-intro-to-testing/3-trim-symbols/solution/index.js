/**
 * trimSymbols - removes consecutive identical symbols if they quantity bigger that size
 * @param {string} string - the initial string
 * @param {number | undefined} size - the allowed size of consecutive identical symbols
 * @returns {string} - the new string without extra symbols according passed size
 */
export const trimSymbols = (string, size) => {
  if (size === 0) return '';
  if (size === undefined) return string;

  const firstSlice = string.slice(0, size);
  const rest = [...string.slice(size)];

  return rest.reduce((accumString, char) => {
    if (!accumString.endsWith(char.repeat(size))) {
      accumString += char;
    }
    return accumString;
  }, firstSlice);
};

export const trimSymbols2 = (string, size) => {
  if (size === 0) return '';
  if (size === undefined) return string;

  let count = 0;
  const result = [];

  for (const char of string) {
    if (result[result.length - 1] === char) {
      if (count < size) {
        result.push(char);
        count += 1;
      }
    } else {
      count = 1;
      result.push(char);
    }
  }

  return result.join('');
};

export const recursion = (string, size) => {
  if (size === 0) return '';
  if (size === undefined) return string;

  const firstSlice = string.slice(0, size);

  const concatValue = (result, index) => {
    if (index > string.length - 1) return result;

    const currentChart = string[index];
    const nextChar = !result.endsWith(currentChart.repeat(size)) ? currentChart : '';

    return concatValue(result + nextChar, index + 1);
  };

  return concatValue(firstSlice, size);
};
