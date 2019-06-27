const generator = require("../lib/generator");

generator.generateLevel(2).then(game => {
  console.log(JSON.stringify(game));
});
