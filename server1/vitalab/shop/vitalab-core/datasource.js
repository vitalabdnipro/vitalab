const { DataSource } = require("typeorm");

const AppDataSource = new DataSource({
  type: "postgres",
  port: 5434,
  host: "185.25.117.23",
  username: "vitalab",
  password: "Pb7aHebT23v5P5akC777",
  database: "vitalabtest",
  entities: ["dist/models/*.js"],
  migrations: ["dist/migrations/*.js"],
});

module.exports = {
  datasource: AppDataSource,
};
