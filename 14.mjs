/*
  https://adventofcode.com/2021/day/14
*/

export const prepare = (input) => {
  let [template, rules] = input.split("\n\n");
  rules = rules
    .split("\n")
    .map((rule) => rule.split(" -> "))
    .reduce(
      (rules, rule) => ({
        ...rules,
        [rule[0]]: rule[1],
      }),
      {}
    );
  return { template, rules };
};

const getPairCounts = (template) => {
  let pairCounts = {};
  for (let i = 0; i < template.length - 1; i++) {
    const pair = template[i] + template[i + 1];
    pairCounts[pair] = (pairCounts[pair] || 0) + 1;
  }
  return pairCounts;
};

const increaseCount = (counts, element, amount = 1) => {
  counts[element] = (counts[element] ?? 0) + amount;
};

const permutate = ({ pairCounts, rules }) => {
  const newPairCounts = {};
  for (let pair in pairCounts) {
    increaseCount(newPairCounts, pair[0] + rules[pair], pairCounts[pair]);
    increaseCount(newPairCounts, rules[pair] + pair[1], pairCounts[pair]);
  }
  return newPairCounts;
};

const getElementCountsFromPairCounts = ({ pairCounts, template }) => {
  // count first and last element from template
  const elementCounts = {
    [template[0]]: 1,
    [template[template.length - 1]]: 1,
  };

  for (let pair in pairCounts) {
    increaseCount(elementCounts, pair[0], pairCounts[pair]);
    increaseCount(elementCounts, pair[1], pairCounts[pair]);
  }

  for (let element in elementCounts) elementCounts[element] /= 2;

  return elementCounts;
};

export const a = ({ template, rules }) => {
  let pairCounts = getPairCounts(template);

  for (let i = 0; i < 10; i++) pairCounts = permutate({ pairCounts, rules });

  const elementCountValues = Object.values(
    getElementCountsFromPairCounts({ pairCounts, template })
  );

  return Math.max(...elementCountValues) - Math.min(...elementCountValues);
};

export const b = ({ template, rules }) => {
  let pairCounts = getPairCounts(template);

  for (let i = 0; i < 40; i++) pairCounts = permutate({ pairCounts, rules });

  const elementCountValues = Object.values(
    getElementCountsFromPairCounts({ pairCounts, template })
  );

  return Math.max(...elementCountValues) - Math.min(...elementCountValues);
};
