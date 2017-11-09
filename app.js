const bodyParser = require('body-parser')
const express    = require('express')
const session    = require('express-session')
const app        = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: "rahasia tong"}))


const index  = require('./routes/index')
const group  = require('./routes/group')
const user   = require('./routes/user')
const events  = require('./routes/event')



app.use('/', index)

app.use('/index', index)


app.use('/user', user)

app.use('/groups', group)

app.use('/event', events)

app.listen(3000)
