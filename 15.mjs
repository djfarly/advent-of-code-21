/*
  https://adventofcode.com/2021/day/15
*/

export const prepare = (input) => {
  return input.split(/\n/).map((line) => {
    return line.split("").map((num) => parseInt(num, 10));
  });
};

const quintupleGrid = (grid) => {
  const sizeY = grid.length;
  const sizeX = grid[0].length;
  const newGrid = new Array(sizeY * 5).fill(null).map((_, y) =>
    new Array(sizeX * 5).fill(null).map((_, x) => {
      const repeat = Math.floor(y / sizeY) + Math.floor(x / sizeX);
      const yy = Math.floor(y % sizeY);
      const xx = Math.floor(x % sizeX);
      return ((grid[yy]?.[xx] + repeat - 1) % 9) + 1;
    })
  );
  return newGrid;
};

const getNeighbours = (x, y, grid) => {
  return [
    // [x - 1, y - 1],
    [x, y - 1],
    // [x + 1, y - 1],
    [x - 1, y],
    [x + 1, y],
    // [x - 1, y + 1],
    [x, y + 1],
    // [x + 1, y + 1],
  ].filter(([_x, _y]) => grid[_y]?.[_x] != null);
};

const getPathAStar = (grid, start, target) => {
  const closedSet = new Set();
  const openSet = new Set([JSON.stringify(start)]);
  const cameFrom = new Map();

  const gScore = new Map();
  gScore.set(JSON.stringify(start), 0);

  const fScore = new Map();
  fScore.set(JSON.stringify(start), heuristic(start, target));

  while (openSet.size > 0) {
    const current = JSON.parse(
      [...openSet].reduce((a, b) => {
        if (fScore.get(a) < fScore.get(b)) {
          return a;
        }
        return b;
      })
    );

    if (current[0] === target[0] && current[1] === target[1]) {
      return {
        path: reconstructPath(cameFrom, current),
        cost:
          gScore.get(JSON.stringify(cameFrom.get(JSON.stringify(current)))) +
          grid[current[1]][current[0]],
      };
    }

    openSet.delete(JSON.stringify(current));
    closedSet.add(JSON.stringify(current));

    const neighbours = getNeighbours(current[0], current[1], grid);

    neighbours.forEach((neighbour) => {
      if (closedSet.has(JSON.stringify(neighbour))) {
        return;
      }

      if (!openSet.has(JSON.stringify(neighbour))) {
        openSet.add(JSON.stringify(neighbour));
      }

      const tentativeGScore =
        gScore.get(JSON.stringify(current)) + grid[neighbour[1]][neighbour[0]];

      if (tentativeGScore >= gScore.get(JSON.stringify(neighbour))) {
        return;
      }

      cameFrom.set(JSON.stringify(neighbour), current);
      gScore.set(JSON.stringify(neighbour), tentativeGScore);
      fScore.set(
        JSON.stringify(neighbour),
        gScore.get(JSON.stringify(neighbour)) + heuristic(neighbour, target)
      );
    });
  }

  return { path: [], cost: 0 };
};

const reconstructPath = (cameFrom, current) => {
  const totalPath = [current];
  while (cameFrom.has(JSON.stringify(current))) {
    current = cameFrom.get(JSON.stringify(current));
    totalPath.push(current);
  }
  return totalPath.reverse();
};

const heuristic = (from, to) => {
  return Math.abs(from[0] - to[0]) + Math.abs(from[1] - to[1]);
};

export const a = (grid) => {
  const start = [0, 0];
  const target = [grid[0].length - 1, grid.length - 1];
  const { cost } = getPathAStar(grid, start, target);
  return cost;
};

export const b = (grid) => {
  const quintupledGrid = quintupleGrid(grid);
  const start = [0, 0];
  const target = [quintupledGrid[0].length - 1, quintupledGrid.length - 1];
  const { cost } = getPathAStar(quintupledGrid, start, target);
  return cost;
};
