const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_DB_USERNAME,
  password: process.env.DATABASE_DB_PASSWORD,
  database: process.env.DATABASE_DB_TEST,
  entities: ["dist/models/*.js"],
  migrations: ["dist/migrations/*.js"],
});

module.exports = {
  datasource: AppDataSource,
};
