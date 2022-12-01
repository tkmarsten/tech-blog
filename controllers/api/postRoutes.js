const router = require('express').Router()
const { Post } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll()
    res.status(200).json(posts)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const newPost = await Post.create({
      ...req.body,
      user_id: req.session.userId
    })
    res.status(200).json(newPost)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.put('/:id', async (req, res) => {
  try {
    const post = await Post.update({
      ...req.body
    }, {
      where: { id: req.params.id }
    })

    if (!post[0]) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    res.status(200).json(post)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const post = await Post.destroy({
      where: { id: req.params.id }
    })

    if (!post) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    res.status(200).json()
  } catch (err) {
    res.status(500).json(err)
  }
})

module.exports = router