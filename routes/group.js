const express = require('express')
const router  = express.Router()
const Model = require('../models')
const checkAuth = require('../helpers/login')


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

      dataGroups.splice(index, 1)
    }
    //res.send(dataGroups)
    res.render('groups/groups', {dataGroups:dataGroups, login:req.session.login})
  })
})




// ================ mygroup ================== //

router.get('/mygroup', checkAuth, (req, res) => {
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


router.get('/editgroup/:id', checkAuth, (req, res) => {
  Model.Group.findOne(
    {where:{id:req.params.id}}
  )
  .then(dataGroup => {
    res.render('groups/editgroup', {dataGroup:dataGroup, login:req.session.login})
  })
})


router.post('/editgroup/:id', checkAuth, (req, res) => {
  Model.Group.update({
    name_of_group : req.body.name_of_group,
    category : req.body.category
  },{where:{id:req.params.id}
  })
  .then(() => {
    res.redirect('/groups/mygroup')
  })

})


router.get('/deletegroup/:id', checkAuth, (req, res) => {
  Model.Group.destroy({
    where:{id:req.params.id}
  }).then(() => {
    res.redirect('/groups/mygroup')
  })
})

// ================ joinedgroup ================== //

router.get('/joinedgroup', checkAuth, (req, res) => {

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





// ================ new group ================== //

router.get('/addnewgroup', checkAuth, (req, res) => {
  res.render('groups/createnewgroup', {login:req.session.login})
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


// ================ addevent group ================== //
router.get('/addevent/:id', (req, res) => {
  res.render('groups/addevents', {GroupId:req.params.id, login:req.session.login})
})

//
// router.post('/addevent/:id', (req, res) => {
//   let name_of_event = req.body.name_of_event
//   let location = req.body.location
//   let date = req.body.date
//   let status = false
//   let GroupId = req.params.id
//   Model.Event.create({
//     name_of_event : name_of_event,
//     location : location,
//     date : date,
//     status : status,
//     GroupId : GroupId
//   })
//   .then(dataEvent => {
//     res.redirect('/groups')
//   })
// })
//
//
// router.get('/detailevent/:id', (req, res) => {
//   Model.Event.findOne({
//     include:[
//       Model.Group
//     ], where:{id:req.params.id}
//   })
//   .then(dataEvent => {
//     //res.send(dataEvent)
//     res.render('groups/votes', {dataEvent:dataEvent, login:req.session.login})
//   })
// })
//
//
//
//
//
// router.post('/detailevent/:id', (req, res) => {
//
//   Model.Event.findOne({
//     include:[
//       Model.Group
//     ], where:{id:req.params.id}
//   }).then(dataEvent => {
//     Model.Event.update({
//       votes : dataEvent.votes + 1
//     },{where:{id:dataEvent.id}})
//     .then(() => {
//       Model.UserGroup.findAll({
//         include:[
//           Model.User
//         ],where:{GroupId:dataEvent.Group.id}
//       })
//       .then(dataGroup => {
//
//         //console.log(dataEvent);
//         let count = (dataEvent.votes / dataGroup.length  ) * 100
//         //console.log(count);
//         if(count >= 80){
//           let toMail = []
//          dataGroup.forEach(item => {
//            toMail.push(item.User.email)
//             mailer(item, dataEvent)
//           })
//          }
//       })
//       .then(() => {
//         res.redirect('/')
//       })
//     })
//   })
// })










module.exports = router
