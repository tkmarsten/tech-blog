const router = require('express').Router()
const { Comment, User, Post } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const comments = await Comment.findAll({
      include: [User, Post]
    })

    res.status(200).json(comments)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.userId
    })
    res.status(200).json(newComment)
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router