const sequelize = require('../config/connection')
const { User, Post } = require('../models')

const userData = require('./user.json')
const postData = require('./post.json')

const seed = async () => {
  await sequelize.sync({ force: true })

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true
  })

  const posts = await Post.bulkCreate(postData, {
    individualHooks: true,
    returning: true
  })

  process.exit(0)
}

seed()