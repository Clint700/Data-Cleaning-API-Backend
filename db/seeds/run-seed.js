const seed = require("./seed");
const db = require("../connection");
const validData = require("../data/validData");
const invalidData = require("../data/invalidData");

const runSeed = () => {
  console.log("Running seed...");

  return seed({ validData, invalidData })
    .then(() => {
      console.log("Seeding completed successfully");
      return db.end();
    })
    .catch((err) => {
      console.error("Error during seeding", err.message || err);
      db.end();
    });
};

runSeed();