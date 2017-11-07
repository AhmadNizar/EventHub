const express = require('express')
const app     = express()

app.set('view engine', 'ejs')

const index = require('./routes/index')

app.use('/', index)

app.listen(3000)