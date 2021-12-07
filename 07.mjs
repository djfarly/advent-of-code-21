/*
  https://adventofcode.com/2021/day/7
*/

export const prepare = (input) => {
  return input.split(/,/).map((num) => parseInt(num, 10));
};

const countCrabs = (crabs, max) =>
  crabs.reduce((acc, crabs) => (acc[crabs]++, acc), Array(max + 1).fill(0));

export const a = (crabs) => {
  const max = Math.max(...crabs);
  const min = Math.min(...crabs);
  const counts = countCrabs(crabs, max);
  const costs = Array(max + 1).fill(0);

  for (let i = min; i <= max; i++) {
    for (let j = min; j <= max; j++) {
      costs[i] += Math.abs(i - j) * counts[j];
    }
  }

  return Math.min(...costs);
};

export const b = (crabs) => {
  const max = Math.max(...crabs);
  const min = Math.min(...crabs);
  const counts = countCrabs(crabs, max);
  const costs = Array(max + 1).fill(0);

  for (let i = min; i <= max; i++) {
    for (let j = min; j <= max; j++) {
      const dist = Math.abs(i - j);
      costs[i] += (0.5 * dist + 0.5 * dist ** 2) * counts[j];
    }
  }

  return Math.min(...costs);
};
