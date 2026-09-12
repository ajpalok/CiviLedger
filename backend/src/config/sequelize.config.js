require("dotenv").config();

// Plain JS config consumed by sequelize-cli (separate from the Sequelize instance in db.js,
// which is what the app itself uses at runtime).
const common = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT || "postgres",
  ...(process.env.DB_DIALECT === "sqlite" && {
    storage: process.env.DB_STORAGE || "./dev.sqlite"
  })
};

module.exports = {
  development: common,
  test: common,
  production: common
};
