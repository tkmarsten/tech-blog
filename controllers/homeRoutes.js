const router = require('express').Router()
const { User, Post, Comment } = require('../models')

router.get('/', async (req, res) => {
  await Post.findAll({
    include: [User],
    order: [
      ['date_created', 'ASC']
    ]
  })
    .then(postData => {
      const hbsData = postData.map(post => post.get({ plain: true }))
      console.log(hbsData)
      res.render('home', {
        loggedIn: req.session.loggedIn,
        userId: req.session.userId,
        posts: hbsData
      })
    })
})

router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/dashboard')
  }

  res.render('login', {
    loggedIn: false
  })
})

router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    return res.redirect('/dashboard')
  }

  res.render('signup', {
    loggedIn: false
  })
})

router.get('/dashboard', async (req, res) => {
  if (!req.session.loggedIn) {
    return res.redirect('/login')
  }

  await User.findByPk(req.session.userId, {
    include: [Post]
  })
    .then(postData => {
      const hbsData = postData.toJSON()
      hbsData.loggedIn = true
      hbsData.userId = req.session.userId
      res.render('dashboard', hbsData)
    })
})

router.get('/create', (req, res) => {
  res.render('create', {
    loggedIn: req.session.loggedIn
  })
})

router.get('/edit/:id', async (req, res) => {
  await Post.findByPk(req.params.id)
    .then(postData => {
      const hbsData = postData.get({ plain: true })
      hbsData.loggedIn = req.session.loggedIn
      res.render('edit', hbsData)
    })
})

router.get('/post/:id', async (req, res) => {
  await Post.findByPk(req.params.id, {
    include: [User, { model: Comment, include: User }],
    order: [
      [Comment, 'date_created', 'ASC']
    ]
  })
    .then(postData => {
      const hbsData = postData.get({ plain: true })
      hbsData.loggedIn = req.session.loggedIn
      res.render('post', hbsData)
    })
})

module.exports = router