/*
  https://adventofcode.com/2021/day/6
*/

export const prepare = (input) => {
  return input.split(/,/).map((num) => parseInt(num, 10));
};

const permutate = (swarmCounts) => {
  return [
    /* 0: */ swarmCounts[1],
    /* 1: */ swarmCounts[2],
    /* 2: */ swarmCounts[3],
    /* 3: */ swarmCounts[4],
    /* 4: */ swarmCounts[5],
    /* 5: */ swarmCounts[6],
    /* 6: */ swarmCounts[7] + swarmCounts[0],
    /* 7: */ swarmCounts[8],
    /* 8: */ swarmCounts[0],
  ];
};

const countSwarm = (swarm) =>
  swarm.reduce((acc, fish) => (acc[fish]++, acc), [0, 0, 0, 0, 0, 0, 0, 0, 0]);

export const a = (swarm) => {
  const days = 80;

  let swarmCounts = countSwarm(swarm);

  for (let day = 1; day <= days; day++) {
    swarmCounts = permutate(swarmCounts);
  }

  return swarmCounts.reduce((acc, timerCount) => acc + timerCount, 0);
};

export const b = (swarm) => {
  const days = 256;

  let swarmCounts = countSwarm(swarm);

  for (let day = 1; day <= days; day++) {
    swarmCounts = permutate(swarmCounts);
  }

  return swarmCounts.reduce((acc, timerCount) => acc + timerCount, 0);
};
