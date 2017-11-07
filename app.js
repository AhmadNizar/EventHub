const bodyParser = require('body-parser')
const express    = require('express')
const session    = require('express-session')
const app        = express()

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(session({secret: "rahasia tong"}))


const index = require('./routes/index')

app.use('/', index)

const group = require('./routes/group')

app.use('/groups', group)


app.listen(3000)
