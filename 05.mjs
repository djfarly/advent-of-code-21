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

const ensureY = (y, matrix) => {
  if (!Array.isArray(matrix[y])) matrix[y] = [];
};

const drawCell = (x, y, matrix) => {
  ensureY(y, matrix);
  matrix[y][x] = (matrix[y][x] ?? 0) + 1;
};

const drawLine = (line, matrix, drawDiagonals = false) => {
  const x1 = line[0][0];
  const x2 = line[1][0];
  const y1 = line[0][1];
  const y2 = line[1][1];

  if (x1 === x2) {
    for (let y = Math.min(y1, y2); y <= Math.max(y1, y2); y++) {
      drawCell(x1, y, matrix);
    }
  } else if (y1 === y2) {
    for (let x = Math.min(x1, x2); x <= Math.max(x1, x2); x++) {
      drawCell(x, y1, matrix);
    }
  } else if (drawDiagonals) {
    const xDir = x1 < x2 ? 1 : -1;
    const yDir = y1 < y2 ? 1 : -1;
    const len = Math.abs(x1 - x2);

    for (let i = 0; i <= len; i++) {
      const x = x1 + i * xDir;
      const y = y1 + i * yDir;
      drawCell(x, y, matrix);
    }
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
