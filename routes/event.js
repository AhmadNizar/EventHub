const express = require('express')
const router  = express.Router()
const mailer = require('../helpers/nodemailer')
const Model = require('../models')


router.get('/', (req, res) => {
  Model.Event.findAll({
    include:[
      Model.Group
    ]
  }).then(dataEvent => {
    res.render('events/events', {dataEvent:dataEvent, login:req.session.login})
  })

})


//
// router.get('/addevent/:id', (req, res) => {
//   res.render('groups/addevents', {GroupId:req.params.id, login:req.session.login})
// })
//
//
router.post('/addevent/:id', (req, res) => {
  let name_of_event = req.body.name_of_event
  let location = req.body.location
  let date = req.body.date
  let status = false
  let GroupId = req.params.id
  Model.Event.create({
    name_of_event : name_of_event,
    location : location,
    date : date,
    status : status,
    GroupId : GroupId
  })
  .then(dataEvent => {
    res.redirect('/groups')
  })
})
//

router.get('/detailevent/:id', (req, res) => {
  Model.Event.findOne({
    include:[
      Model.Group
    ], where:{id:req.params.id}
  })
  .then(dataEvent => {
    //res.send(dataEvent)
    res.render('groups/votes', {dataEvent:dataEvent, login:req.session.login})
  })
})




router.post('/detailevent/:id', (req, res) => {

  Model.Event.findOne({
    include:[
      Model.Group
    ], where:{id:req.params.id}
  }).then(dataEvent => {
    Model.Event.update({
      votes : dataEvent.votes + 1
    },{where:{id:dataEvent.id}})
    .then(() => {
      Model.UserGroup.findAll({
        include:[
          Model.User
        ],where:{GroupId:dataEvent.Group.id}
      })
      .then(dataGroup => {
        let count = (dataEvent.votes / dataGroup.length  ) * 100
        //console.log(count);
        if(count >= 80){
          let toMail = []
         dataGroup.forEach(item => {
           toMail.push(item.User.email)
            mailer(item, dataEvent)
          })
         }
      })
      .then(() => {
        res.redirect('/')
      })
    })
  })
})

































module.exports = router
