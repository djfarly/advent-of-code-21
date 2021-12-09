/*
  https://adventofcode.com/2021/day/8
*/

export const prepare = (input) => {
  return input.split(/\n/).map((line) => {
    return line.split("").map((num) => parseInt(num, 10));
  });
};

const getNeighbours = (x, y, heightmap) => {
  return [
    // [x - 1, y - 1],
    [x, y - 1],
    // [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    // [x - 1, y + 1],
    [x, y + 1],
    // [x + 1, y + 1],
  ].filter(([_x, _y]) => heightmap[_y]?.[_x] != null);
};

const isMinimum = (x, y, heightmap) => {
  // check if x, y coordinates are lower than all its neighbours in heightmap
  return getNeighbours(x, y, heightmap).every(([_x, _y]) => {
    return heightmap[y][x] < heightmap[_y][_x];
  });
};

const getBasinSize = (x, y, heightmap) => {
  const visited = new Set();
  let queue = [[x, y]];

  while (queue.length > 0) {
    const [x, y] = queue.shift();
    const toVisit = getNeighbours(x, y, heightmap).filter(
      ([_x, _y]) =>
        !visited.has(`${[_x, _y]}`) &&
        heightmap[_y][_x] >= heightmap[y][x] &&
        heightmap[_y][_x] < 9
    );
    toVisit.forEach(([_x, _y]) => visited.add(`${[_x, _y]}`));
    queue = [...queue, ...toVisit];
  }

  return visited.size + 1;
};

export const a = (heightmap) => {
  return heightmap.reduce((acc, row, y) => {
    return (
      acc +
      row.reduce((acc, num, x) => {
        return acc + (isMinimum(x, y, heightmap) ? num + 1 : 0);
      }, 0)
    );
  }, 0);
};

export const b = (heightmap) => {
  const basins = [];
  heightmap.forEach((row, y) => {
    row.forEach((_, x) => {
      if (isMinimum(x, y, heightmap)) {
        basins.push(getBasinSize(x, y, heightmap));
      }
    });
  });

  return basins
    .sort((a, b) => b - a)
    .slice(0, 3)
    .reduce((a, b) => a * b, 1);
};
