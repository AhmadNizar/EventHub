const express = require('express')
const router  = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
  Model.Group.findAll()
  .then(dataGroups => {
    res.render('groups/groups', {dataGroups:dataGroups, login:req.session.login})
  })
})


router.get('/addNewGroup', (req, res) => {
  console.log(req.session);
  res.send(req.session)
  //res.render('groups/add', )
})






module.exports = router
