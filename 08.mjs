/*
  https://adventofcode.com/2021/day/8
*/

export const prepare = (input) => {
  return input.split(/\n/).map((line) => {
    const [sequence, output] = line
      .split(" | ")
      .map((io) => io.split(" ").map((pattern) => new Set(pattern.split(""))));

    return { sequence, output };
  });
};

function intersection(setA, setB) {
  let _intersection = new Set();
  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }
  return _intersection;
}

function equals(setA, setB) {
  if (setA.size !== setB.size) return false;
  for (var a of setA) if (!setB.has(a)) return false;
  return true;
}

// 0:      1:      2:      3:      4:
//  aaaa    ....    aaaa    aaaa    ....
// b    c  .    c  .    c  .    c  b    c
// b    c  .    c  .    c  .    c  b    c
//  ....    ....    dddd    dddd    dddd
// e    f  .    f  e    .  .    f  .    f
// e    f  .    f  e    .  .    f  .    f
//  gggg    ....    gggg    gggg    ....

//  5:      6:      7:      8:      9:
//  aaaa    aaaa    aaaa    aaaa    aaaa
// b    .  b    .  .    c  b    c  b    c
// b    .  b    .  .    c  b    c  b    c
//  dddd    dddd    ....    dddd    dddd
// .    f  e    f  .    f  e    f  .    f
// .    f  e    f  .    f  e    f  .    f
//  gggg    gggg    ....    gggg    gggg

export const a = (lines) => {
  let count1478 = 0;
  for (const { output } of lines) {
    for (const p of output) {
      if (p.size === 2 || p.size === 4 || p.size === 3 || p.size === 7) {
        count1478++;
      }
    }
  }
  return count1478;
};

export const b = (lines) => {
  let result = 0;
  for (const { sequence, output } of lines) {
    const patterns = [];
    patterns[1] = sequence.find((p) => p.size === 2);
    patterns[7] = sequence.find((p) => p.size === 3);
    patterns[8] = sequence.find((p) => p.size === 7);
    patterns[4] = sequence.find((p) => p.size === 4);
    patterns[9] = sequence.find(
      (p) => p.size === 6 && intersection(p, patterns[4]).size === 4
    );
    patterns[0] = sequence.find(
      (p) =>
        p.size === 6 &&
        intersection(p, patterns[7]).size === 3 &&
        p != patterns[9]
    );
    patterns[6] = sequence.find(
      (p) => p.size === 6 && p !== patterns[9] && p != patterns[0]
    );
    patterns[5] = sequence.find(
      (p) => p.size === 5 && intersection(p, patterns[6]).size === 5
    );
    patterns[3] = sequence.find(
      (p) =>
        p.size === 5 &&
        intersection(p, patterns[4]).size === 3 &&
        p != patterns[5]
    );
    patterns[2] = sequence.find(
      (p) => p.size === 5 && p !== patterns[5] && p !== patterns[3]
    );

    let digits = output.map((digitOut) =>
      patterns.findIndex((pattern) => equals(pattern, digitOut))
    );

    if (digits.some((d) => d === -1)) {
      throw new Error("whoops");
    }

    result += parseInt(digits.join(""), 10);
  }

  return result;
};
