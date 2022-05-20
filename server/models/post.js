const DataTypes = require("sequelize");
const { Model } = DataTypes;

module.exports = class Post extends Model {
  static init(sequelize) {
    return super.init(
      {
        title: {
          type: DataTypes.TEXT,
          allowNull: true,
        },
        content: {
          type: DataTypes.TEXT,
          allowNull: false,
        },
        activityName: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        searchName: {
          type: DataTypes.STRING(30),
          allowNull: true,
        },
        kinds: {
          type: DataTypes.STRING(30),
          allowNull: false,
        },
      },
      {
        modelName: "Post",
        tableName: "posts",
        charset: "utf8mb4",
        collate: "utf8mb4_general_ci",
        sequelize,
      }
    );
  }
  static associate(db) {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: "PostHashtag" });
    db.Post.belongsToMany(db.User, { through: "Like", as: "Likers" });
    db.Post.belongsToMany(db.User, { through: "Save", as: "Saver" });
  }
};