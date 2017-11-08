const express = require('express')
const router  = express.Router()
const Model = require('../models')



router.get('/addevent', (req, res) => {
  res.render('groups/event', {GroupId:req.params.id})
})




module.exports = router
