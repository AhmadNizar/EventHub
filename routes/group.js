const express = require('express')
const router  = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
  Model.Group.findAll()
  .then(dataGroups => {
    
    res.render('groups/groups', {dataGroups:dataGroups})
  })
})





module.exports = router
