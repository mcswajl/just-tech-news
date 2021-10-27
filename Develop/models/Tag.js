const { Model, DataTypes } = require('sequelize');

const sequelize = require('../config/connection.js');

class Tag extends Model {}

Tag.init(
  {
    tag_id: {
      type: DataTypes.INTEGER,
      model: 'tag',
      key: 'id',
    }
  },
  {
    tag_name: {
      type: DataTypes.STRING,
  }
},
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'tag',
  }
);

module.exports = Tag;
