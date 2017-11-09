const express = require('express')
const router  = express.Router()
const Models  = require('../models')
const bcrypt  = require('bcrypt');

router.get('/', (req, res) => {
	Models.Event.findAll({
		include:[
		  {model:Models.Group}
		]
	}).then(dataEvent => {
		//res.send(dataEvent)
		res.render('landingpage', {login : req.session.login, dataEvent:dataEvent})
	})

})



router.get('/signup', (req, res)=> {
	let err = ""
	res.render('login/signin', {err})
})

router.post('/signup', (req, res)=> {
	Models.User.create({
		first_name : req.body.first_name,
		last_name : req.body.last_name,
		username : req.body.username,
		password : req.body.password,
		email : req.body.email
	}).then(()=> {
		res.redirect('/signin')
	}).catch(err=> {
		res.render('signup', {err})
	})
})

router.get('/signin', (req, res) => {
	let err = ""
	res.render('login/signin', {err})
})

router.post('/signin', (req, res) => {
	Models.User.findOne({
		where: {
			username : req.body.username
		}
	}).then(user => {
		if(user){
			bcrypt.compare(req.body.password, user.password).then(function(result) {
    		// res == true
    		if(result){
					Models.Event.findAll({
						include:[
							{model:Models.Group}
						]
					}).then(dataEvent => {
						//res.send(dataEvent)
						req.session.login = true
						req.session.UserId = user.id
						res.render('landingpage', {login : req.session.login, dataEvent:dataEvent})
					})
    		}else{
    			let err = "Username or Password is invalid"
					res.render('login/signin', {err})
    		}
			});
		}else{
			let err = "Username or password is invalid"
			res.render('login/signin', {err})
		}
	})
})

router.get('/logout', (req, res, next)=>{
	req.session.destroy()
	res.redirect('/')
})

module.exports = router
