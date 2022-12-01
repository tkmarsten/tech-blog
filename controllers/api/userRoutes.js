const router = require('express').Router()
const { User } = require('../../models')

router.get('/', async (req, res) => {
  try {
    const user = await User.findAll()
    res.status(200).json(user)
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body)

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.loggedIn = true;

      res.status(200).json(user)
    })
  } catch (err) {
    res.status(500).json(err)
  }
})

router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({ where: { username: req.body.username } })

    if (!dbUserData) {
      res.status(400).json({ message: 'Incorrect username.' })
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password)

    if (!validPassword) {
      res.status(400).json({ message: 'Incorrect password.' })
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id
      req.session.loggedIn = true
      req.session.cookie
      res.status(200).json({ user: dbUserData, message: 'You are now logged in.' })
    })
  } catch (err) {
    res.status(400).json(err)
  }
})

router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end()
    })
  } else {
    res.status(404).end()
  }
})

module.exports = router