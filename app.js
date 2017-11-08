const bodyParser = require('body-parser')
const express    = require('express')
const session    = require('express-session')
const app        = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: "rahasia tong"}))


const index = require('./routes/index')
const group = require('./routes/group')
const user = require('./routes/user')
const event = require('./routes/event')




app.use('/', index)

app.use('/user', user)

app.use('/groups', group)

app.use('/', event)

app.listen(3000)
