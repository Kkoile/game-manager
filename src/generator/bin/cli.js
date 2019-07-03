const generator = require("../lib/generator");
const fs = require("fs");
const util = require("util");
const path = require("path");

const IDENTIFIER_PREFIX = "level_1_";

async function generateAndSave(identifier) {
  console.log(`Generating level ${identifier}`);
  const level = await generator.generateLevel(2);
  console.log(`Saving level ${identifier}`);
  await util.promisify(fs.writeFile)(
    path.join(__dirname, `../../assets/levels/${identifier}.json`),
    JSON.stringify(level, null, 2)
  );
  const levels = JSON.parse(
    await util.promisify(fs.readFile)(
      path.join(__dirname, "../../assets/levels/levels.json"),
      "utf8"
    )
  );
  const identifierAlreadyExists = !!levels.find(existingIdentifier => {
    return identifier === existingIdentifier;
  });
  if (!identifierAlreadyExists) {
    levels.push(identifier);
    await util.promisify(fs.writeFile)(
      path.join(__dirname, "../../assets/levels/levels.json"),
      JSON.stringify(levels)
    );
  }
}

async function generateMultiple(numberOfLevels, offset) {
  console.log("Start generating levels");
  for (let i = 0; i < numberOfLevels; i++) {
    await generateAndSave(`${IDENTIFIER_PREFIX}${offset + i + 1}`);
  }
  console.log("Finished generating levels");
}

generateMultiple(10, 6);
