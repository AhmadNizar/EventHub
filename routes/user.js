const express = require('express')
const router  = express.Router()
const Model = require('../models')
const checkAuth = require('../helpers/login')


router.get('/join/:id', checkAuth, (req, res) => {
  Model.UserGroup.create({
    UserId : req.session.UserId,
    GroupId : req.params.id,
    role : 'member'
  })
  .then(() => {
    res.redirect('/groups')
  })
})

// router.get('/unfollow/:id', (req, res) => {
//   console.log(req.body);
// })




module.exports = router
