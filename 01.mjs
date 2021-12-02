/*
  https://adventofcode.com/2021/day/1
*/

export const prepare = (input) =>
  input.split(/\r?\n/).map((num) => parseInt(num, 10));

export const a = (input) => {
  let increaseCount = 0;
  for (let index = 1; index < input.length; index++) {
    // console.log(
    //   `[${index}]:`,
    //   input[index],
    //   input[index - 1] < input[index] ? '(increased)' : '(decreased)',
    // );
    increaseCount += input[index - 1] < input[index] ? 1 : 0;
  }
  return increaseCount;
};

export const b = (input) =>
  a(
    input
      .map((_, index, array) =>
        array[index + 2] != null
          ? array[index] + array[index + 1] + array[index + 2]
          : null
      )
      .slice(0, -2)
  );
