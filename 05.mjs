/*
  https://adventofcode.com/2021/day/5
*/

export const prepare = (input) => {
  return input
    .split(/\r?\n/)
    .map((line) =>
      line
        .split(" -> ")
        .map((coords) => coords.split(",").map((num) => parseInt(num, 10)))
    );
};

const drawLine = ([[x1, y1], [x2, y2]], matrix, drawDiagonals = false) => {
  if (!drawDiagonals && !(x1 === x2 || y1 === y2)) return;

  const drawCell = (x, y) => {
    if (!Array.isArray(matrix[y])) matrix[y] = [];
    matrix[y][x] = (matrix[y][x] ?? 0) + 1;
  };

  const xDir = x1 === x2 ? 0 : x1 < x2 ? 1 : -1;
  const yDir = y1 === y2 ? 0 : y1 < y2 ? 1 : -1;
  const lineLength = Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));

  for (let i = 0; i <= lineLength; i++) {
    drawCell(x1 + i * xDir, y1 + i * yDir);
  }
};

const countDangerous = (matrix) => {
  let count = 0;
  for (const row of matrix) {
    if (Array.isArray(row)) {
      for (const cell of row) {
        if (cell > 1) count++;
      }
    }
  }
  return count;
};

export const a = (input) => {
  const matrix = [];
  for (const line of input) {
    drawLine(line, matrix);
  }
  return countDangerous(matrix);
};

export const b = (input) => {
  const matrix = [];
  for (const line of input) {
    drawLine(line, matrix, true);
  }
  return countDangerous(matrix);
};

// this draws the whole matrix :O
// console.log(
//   matrix
//     .map((row) => {
//       let rowLog = "";
//       for (let i = 0; i < row.length; i++) {
//         const cell = row[i];
//         rowLog += cell ?? " ";
//       }
//       return rowLog;
//     })
//     .join("\n")
// );
