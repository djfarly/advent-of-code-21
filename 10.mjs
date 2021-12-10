/*
  https://adventofcode.com/2021/day/10
*/

export const prepare = (input) => {
  return input.split(/\n/).map((line) => {
    return line.split("");
  });
};

const closingToOpeningBracket = {
  ")": "(",
  "]": "[",
  "}": "{",
  ">": "<",
};

const corruptedClosingBracketScore = {
  ")": 3,
  "]": 57,
  "}": 1197,
  ">": 25137,
};

const incompletedBracketScore = {
  "(": 1,
  "[": 2,
  "{": 3,
  "<": 4,
};

export const a = (lines) => {
  let corruptedScore = 0;

  lines.forEach((line) => {
    const stack = [];
    line.some((bracketChar) => {
      if ("]>})".includes(bracketChar)) {
        if (
          stack.length == 0 ||
          stack.pop() != closingToOpeningBracket[bracketChar]
        ) {
          corruptedScore += corruptedClosingBracketScore[bracketChar];
          return true;
        }
      } else stack.push(bracketChar);
    });
  });

  return corruptedScore;
};

export const b = (lines) => {
  const incompletedScores = [];

  lines.forEach((line) => {
    const stack = [];
    const isCorrupted = line.some((bracketChar) => {
      if ("]>})".includes(bracketChar)) {
        if (
          stack.length == 0 ||
          stack.pop() != closingToOpeningBracket[bracketChar]
        ) {
          return true;
        }
      } else stack.push(bracketChar);
    });
    if (!isCorrupted)
      incompletedScores.push(
        stack
          .reverse()
          .reduce((score, c) => score * 5 + incompletedBracketScore[c], 0)
      );
  });

  return incompletedScores.sort((a, b) => a - b)[
    Math.floor(incompletedScores.length / 2)
  ];
};
