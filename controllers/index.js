const router = require('express').Router()

const homeRoutes = require('./homeRoutes.js')
const apiRoutes = require('./api')

router.use(homeRoutes)
router.use('/api', apiRoutes)

router.get("/session", (req, res) => {
  res.json(req.session)
})

module.exports = router
