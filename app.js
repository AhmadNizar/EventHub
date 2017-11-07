const bodyParser = require('body-parser')
const express    = require('express')
const app        = express()

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: false }))

const index = require('./routes/index')

app.use('/', index)

app.listen(3000)