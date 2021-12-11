/*
  https://adventofcode.com/2021/day/11
*/

export const prepare = (input) => {
  return input.split(/\n/).map((line) => {
    return line.split("").map((num) => parseInt(num, 10));
  });
};

const getNeighbours = (x, y, grid) => {
  return [
    [x - 1, y - 1],
    [x, y - 1],
    [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    [x - 1, y + 1],
    [x, y + 1],
    [x + 1, y + 1],
  ].filter(([_x, _y]) => grid[_y]?.[_x] != null);
};

const permutate = (grid) => {
  const flashes = new Set();
  let flashQueue = [];
  // add 1 to all cells in grid
  const newGrid = grid.map((row, y) =>
    row.map((cell, x) => {
      if (cell >= 9) {
        flashQueue.push([x, y]);
      }
      return cell + 1;
    })
  );

  while (flashQueue.length > 0) {
    const [x, y] = flashQueue.shift();
    newGrid[y][x]++;

    if (newGrid[y][x] > 9) {
      if (flashes.has(JSON.stringify([x, y]))) {
        newGrid[y][x] = 9;
        continue;
      }

      // set this cell as flashed
      flashes.add(JSON.stringify([x, y]));
      flashQueue = [...flashQueue, ...getNeighbours(x, y, newGrid)];
    }
  }

  // loop over flashes and set flashed cells to 0
  for (const cellXY of flashes) {
    const [x, y] = JSON.parse(cellXY);
    newGrid[y][x] = 0;
  }

  return [newGrid, flashes.size];
};

export const a = (grid) => {
  // permutate grid 100 times
  let flashCount = 0;
  for (let steps = 0; steps < 100; steps++) {
    const [newGrid, flashesSize] = permutate(grid);
    flashCount += flashesSize;
    grid = newGrid;
    // console.log();
    // console.log("After step:", i);
    // console.log(grid.map((row) => row.join("")).join("\n"));
    // console.log();
  }
  return flashCount;
};

export const b = (grid) => {
  let steps = 0;
  let isFound = false;

  while (!isFound) {
    steps++;
    const [newGrid, flashesSize] = permutate(grid);
    if (flashesSize === 100) {
      isFound = true;
    }
    grid = newGrid;
  }

  return steps;
};
