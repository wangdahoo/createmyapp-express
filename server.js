const path = require('path')
const express = require('express')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const morgan = require('morgan')

// express instance
const app = express()

// template engine
app.engine('html', require('ejs').renderFile)

// cors
app.use(cors())
app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: false })) // for parsing application/x-www-form-urlencoded
app.use(cookieParser())

// logger
app.use(morgan(require('./constants').LOG_FORMAT))

// static files
app.use(express.static(path.join(__dirname, 'public')))

// api helpers
app.use((req, res, next) => {
  res.fail = (err_msg, err_code) => {
    body = {status: 'fail', err_msg: err_msg || '', err_code: err_code || 400}
    res.status(400).send(body)
  }

  res.succeed = (payload) => {
    body = {status: 'ok', payload: payload || {}}
    res.send(body)
  }

  next()
})

app.get('/', (req, res) => {
  res.render('index.html', {
    who: 'express'
  })
})

app.get('/ping', (req, res) => {
  res.succeed('pong!')
})

// routes
app.use('/user', require('./routes/user'))

app.listen(3000)
