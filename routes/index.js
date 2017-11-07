const express = require('express')
const router  = express.Router()
const Models  = require('../models')

router.get('/', (req, res) => {
	res.render('index')
})

router.get('/signup', (req, res)=> {
	res.render('signup')
})

router.post('/signup', (req, res)=> {
	Models.User.create({
		first_name : req.body.first_name, 
		last_name : req.body.last_name, 
		username : req.body.username, 
		password : req.body.password,
		email : req.body.email
	})
})

module.exports = router