import _fs from "fs";
const fs = _fs.promises;

const requestedIndex = process.argv[2] && parseInt(process.argv[2], 10) - 1;

const indexToDay = (index) => `${index + 1}`.padStart(2, "0");

const getChallange = async (day) => {
  try {
    return {
      input: await fs.readFile(`./${day}.txt`, "utf8"),
      ...(await import(`./${day}.mjs`)),
    };
  } catch {
    return;
  }
};

const run = ({ a, b, input, prepare }, day) => {
  console.log();
  console.log(`===== DAY ${day} =====`);
  console.log("[a]", a(prepare(input)));
  console.log("[b]", b(prepare(input)));
  console.log();
};

const runIndex = async (index) => {
  const day = indexToDay(index);
  const challange = await getChallange(day);
  if (challange) {
    run(challange, day);
  }
};

if (requestedIndex != null) {
  await runIndex(requestedIndex);
} else {
  for (let index = 24; index >= 0; index--) {
    await runIndex(index);
  }
}
