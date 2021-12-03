/*
  https://adventofcode.com/2021/day/3
*/

export const prepare = (input) =>
  input.split(/\r?\n/).map((entry) => {
    return entry.split("").map((num) => parseInt(num, 2));
  });

const getBitCounts = (input) => {
  let counts = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < input.length; i++) {
    const values = input[i];
    for (let j = 0; j < values.length; j++) {
      counts[j] += values[j];
    }
  }
  return counts;
};

export const a = (input) => {
  const counts = getBitCounts(input);

  const gamma = parseInt(
    counts.map((count) => (count >= input.length / 2 ? 1 : 0)).join(""),
    2
  );

  const epsilon = gamma ^ 4095;

  return gamma * epsilon;
};

export const b = (input) => {
  let o2 = [...input];
  let co2 = [...input];

  for (let i = 0; i < 12; i++) {
    const o2Length = o2.length;
    if (o2Length > 1) {
      const counts = getBitCounts(o2);
      o2 = o2.filter(
        (value) => value[i] === (counts[i] >= o2Length / 2 ? 1 : 0)
      );
    }

    const co2Length = co2.length;
    if (co2Length > 1) {
      const counts = getBitCounts(co2);
      co2 = co2.filter(
        (value) => value[i] === (counts[i] >= co2Length / 2 ? 0 : 1)
      );
    }
  }

  return parseInt(o2[0].join(""), 2) * parseInt(co2[0].join(""), 2);
};
