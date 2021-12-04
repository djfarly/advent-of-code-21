/*
  https://adventofcode.com/2021/day/4
*/

export const prepare = (input) => {
  let fields = input.split(/\r?\n\r?\n/);
  const numbers = fields
    .shift()
    .split(",")
    .map((num) => parseInt(num, 10));

  fields = fields.map((field) =>
    field.split(/\r?\n/).map((row) =>
      row
        .trim()
        .split(/\W+/)
        .map((num) => parseInt(num, 10))
    )
  );

  return { fields, numbers };
};

const makeMove = (number, field) => {
  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      if (field[x][y] === number) field[x][y] = null;
    }
  }
  return field;
};

const checkWin = (field) => {
  const row = [0, 0, 0, 0, 0];
  const col = [0, 0, 0, 0, 0];

  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      if (field[x][y] === null) {
        row[x]++;
        col[y]++;
      }
    }
  }
  return row.some((count) => count === 5) || col.some((count) => count === 5);
};

const sumField = (field) => {
  let sum = 0;
  for (let x = 0; x < field.length; x++) {
    for (let y = 0; y < field[x].length; y++) {
      sum += field[x][y];
    }
  }
  return sum;
};

export const a = ({ fields, numbers }) => {
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < fields.length; j++) {
      fields[j] = makeMove(number, fields[j]);
      const isWin = checkWin(fields[j]);
      if (isWin) {
        return sumField(fields[j]) * number;
      }
    }
  }
};

export const b = ({ fields, numbers }) => {
  let winCount = 0;
  for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    for (let j = 0; j < fields.length; j++) {
      if (fields[j] !== null) {
        fields[j] = makeMove(number, fields[j]);
        const isWin = checkWin(fields[j]);
        if (isWin && winCount === fields.length - 1) {
          return sumField(fields[j]) * number;
        } else if (isWin) {
          fields[j] = null;
          winCount++;
        }
      }
    }
  }
};
