/*
  https://adventofcode.com/2021/day/13
*/

export const prepare = (input) => {
  let [dots, folds] = input.split("\n\n").map((lines) => lines.split("\n"));
  dots = dots.map((dot) => dot.split(",").map((coord) => parseInt(coord, 10)));
  folds = folds.map((fold) => {
    const [axis, coord] = fold.split(" ")[2].split("=");
    return [axis, parseInt(coord, 10)];
  });
  return { dots, folds };
};

const fold = (dots, [foldAxis, foldCoord]) => {
  const foldAxisIndex = foldAxis === "x" ? 0 : 1;
  return dots.map((dot) => {
    if (dot[foldAxisIndex] > foldCoord) {
      dot[foldAxisIndex] = foldCoord - (dot[foldAxisIndex] - foldCoord);
    }
    return dot;
  });
};

export const a = ({ dots, folds }) => {
  const dotsAfterFirstFold = fold(dots, folds[0]);
  const uniqueDots = new Set(dotsAfterFirstFold.map((dot) => dot.join(",")));
  return uniqueDots.size;
};

export const b = ({ dots, folds }) => {
  let dotsAfterFolds = dots;
  for (let i = 0; i < folds.length; i++) {
    dotsAfterFolds = fold(dotsAfterFolds, folds[i]);
  }
  // get maximum x and y
  const maxX = Math.max(...dotsAfterFolds.map((dot) => dot[1]));
  const maxY = Math.max(...dotsAfterFolds.map((dot) => dot[0]));
  // create grid
  const grid = new Array(maxX + 1)
    .fill(0)
    .map(() => new Array(maxY + 1).fill(" "));
  // fill grid
  dotsAfterFolds.forEach((dot) => {
    grid[dot[1]][dot[0]] = "█";
  });
  // print grid
  return "\n" + grid.map((row) => row.join("")).join("\n");
};
