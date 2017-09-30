const router = require('express').Router()

router.get('/:username', (req, res) => {
  res.succeed(`hello,${req.params.username}`)
})

module.exports = router
