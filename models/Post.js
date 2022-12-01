const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const moment = require('moment')

class Post extends Model { }

Post.init(
  {
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_created: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: moment().format('D MMM YYYY')
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',
        key: 'id'
      }
    }
  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'post'
  }
)

module.exports = Post