const express = require('express')
const router  = express.Router()
Model = require('../models')



router.get('/join/:id', (req, res) => {
  Model.UserGroup.create({
    UserId : req.session.UserId,
    GroupId : req.params.id,
    role : 'member'
  })
  .then(() => {
    res.redirect('/groups')
  })
})

router.get('/unfollow/:id', (req, res) => {
  console.log(req.body);
})




module.exports = router
