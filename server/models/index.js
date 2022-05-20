const Sequelize = require("sequelize");
const user = require("./user");
const post = require("./post");
const image = require("./image");
const comment = require("./comment");
const hashtag = require("./hashtag");

const env = process.env.NODE_ENV || "development";

const config = require("../config/config")[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

db.Post = post;
db.User = user;
db.Hashtag = hashtag;
db.Image = image;
db.Comment = comment;

Object.keys(db).forEach((modelName) => {
  db[modelName].init(sequelize);
});

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
