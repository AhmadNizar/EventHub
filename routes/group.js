const express = require('express')
const router  = express.Router()
const Model = require('../models')

router.get('/', (req, res) => {
  Model.Group.findAll()
  .then(dataGroups => {
    res.render('groups/groups', {dataGroups:dataGroups, login:req.session.login})
  })
})


router.get('/mygroup', (req, res) => {
  //console.log(req.session.UserId, 'ooooooooooooooo');
  Model.User.findOne(
  {
    include:[Model.Group],
   where:{id:req.session.UserId}
 })
  .then(dataUser => {
    // res.send(dataUser)
    res.render('groups/mygroup', {login:req.session.login, dataGroups:dataUser})
  })
})

router.get('/joinedgroup', (req, res) => {

  Model.User.findOne(
  {
    include:[Model.Group],
   where:{id:req.session.UserId}
 })
  .then(dataUser => {
    // res.send(dataUser)
    res.render('groups/joinedgroup', {login:req.session.login, dataGroups:dataUser})
  })
})


router.get('/addnewgroup', (req, res) => {
  res.render('groups/createnewgroup')
})

router.post('/addnewgroup', (req, res) => {
  Model.Group.create({
    name_of_group : req.body.name_of_group,
    category : req.body.category
  })
  .then((dataGroups, created)=> {
    Model.UserGroup.create({

      UserId : req.session.UserId,
      GroupId : dataGroups.id,
      role : 'admin'

    })
    .then(() => {
      res.redirect('/groups/mygroup')
    })
  })
})


//
// router.get('/addNewGroup', (req, res) => {
//   model.Group.findOne(
//     {where:{id:req.params.id}
//   )
//   .then(dataGroup => {
//     res.render('/editgroup')
//   })
//
// })




module.exports = router
