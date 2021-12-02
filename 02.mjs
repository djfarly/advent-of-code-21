/*
  https://adventofcode.com/2021/day/2
*/

export const prepare = (input) =>
  input.split(/\r?\n/).map((entry) => {
    const [dir, val] = entry.split(" ");
    return [dir, parseInt(val, 10)];
  });

export const a = (input) => {
  let pos = [0, 0];
  for (let index = 0; index < input.length; index++) {
    const [dir, val] = input[index];
    switch (dir) {
      case "forward":
        pos[0] += val;
        break;
      case "down":
        pos[1] += val;
        break;
      case "up":
        pos[1] -= val;
        break;
    }
  }
  return pos[0] * pos[1];
};

export const b = (input) => {
  let aim = 0;
  let pos = [0, 0];
  for (let index = 0; index < input.length; index++) {
    const [dir, val] = input[index];
    switch (dir) {
      case "forward":
        pos[0] += val;
        pos[1] += aim * val;
        break;
      case "down":
        aim += val;
        break;
      case "up":
        aim -= val;
        break;
    }
  }
  return pos[0] * pos[1];
};
