'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class post_likes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  post_likes.init({
    User_id: DataTypes.INTEGER,
    Post_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'post_likes',
  });
  return post_likes;
};