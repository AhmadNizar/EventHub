const express = require('express')
const router  = express.Router()
const Model = require('../models')



// ================ group ================== //

router.get('/', (req, res) => {
  Model.Group.findAll({
    include : [Model.UserGroup]
  })
  .then(dataGroups => {
    let groupArr = []
    dataGroups.forEach(group => {
      group.UserGroups.forEach(user => {
        if(user.UserId == req.session.UserId){
          groupArr.push(group.id)
        }
      })
    })
    for(let i = 0; i < groupArr.length; i++){
      let index = dataGroups.findIndex(function(group){
        return group.id == groupArr[i]
      })
      console.log(index, '---------------');
      dataGroups.splice(index, 1)
    }
    //res.send(dataGroups)
    res.render('groups/groups', {dataGroups:dataGroups, login:req.session.login})
  })
})




// ================ mygroup ================== //

router.get('/mygroup', (req, res) => {
  Model.User.findOne(
  {
    include:[Model.Group],
   where:{id:req.session.UserId}
 })
  .then(dataUser => {
     //res.send(dataUser)
     res.render('groups/mygroup', {login:req.session.login, dataGroups:dataUser})
  })
})


router.get('/editgroup/:id', (req, res) => {
  Model.Group.findOne(
    {where:{id:req.params.id}}
  )
  .then(dataGroup => {
    res.render('groups/editgroup', {dataGroup:dataGroup, login:req.session.login})
  })
})


router.post('/editgroup/:id', (req, res) => {
  Model.Group.update({
    name_of_group : req.body.name_of_group,
    category : req.body.category
  },{where:{id:req.params.id}
  })
  .then(() => {
    res.redirect('/groups/mygroup')
  })

})


router.get('/deletegroup/:id', (req, res) => {
  Model.Group.destroy({
    where:{id:req.params.id}
  }).then(() => {
    res.redirect('/groups/mygroup')
  })
})

// ================ joinedgroup ================== //

router.get('/joinedgroup', (req, res) => {

  Model.User.findOne(
  {
    include:[Model.Group],
   where:{id:req.session.UserId}
 })
  .then(dataUser => {
     //res.send(dataUser)
    res.render('groups/joinedgroup', {login:req.session.login, dataGroups:dataUser})
  })
})

//
// router.get('/unfollow/:id', (req, res) => {
//   console.log(req.body);
// })
//

router.get('/addevent/:id', (req, res) => {
  res.render('groups/addevents', {GroupId:req.params.id, login:req.session.login})
})






// ================ new group ================== //

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






module.exports = router
