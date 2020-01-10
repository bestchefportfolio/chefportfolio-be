const db = require("../../database/dbconfig.js");

module.exports = () => {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
};
