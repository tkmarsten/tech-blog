const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection')
const moment = require('moment')

class Comment extends Model { }

Comment.init(
  {
    content: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date_created: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: moment().format('D MMM YYYY')
    },
    post_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'post',
        key: 'id'
      }
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
    modelName: 'comment'
  }
)

module.exports = Comment