const express = require('express')
const router  = express.Router()
const Models  = require('../models')
const bcrypt  = require('bcrypt');

router.get('/', (req, res) => {
	res.render('landingpage', {login : req.session.login})
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
    			req.session.login = true
    			res.render('landingpage', {login : req.session.login})
    		}else{
    			let err = "Username or Password is invalid"
					res.render('signin', {err})
    		}
			});
		}else{
			let err = "Username or password is invalid"
			res.render('signin', {err})
		}
	})
})

router.get('/logout', (req, res, next)=>{
	req.session.destroy()
	res.redirect('/')
})

module.exports = router
