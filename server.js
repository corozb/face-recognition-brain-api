const express = require('express')
const bodyParser = require('body-parser') // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  // Enter your own database information here based on what you created
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    port: 5000,
    user: 'postgres',
    password: '',
    database: 'users',
  },
})

const app = express()

app.use(cors())
app.use(express.json()) // latest version of exressJS now comes with Body-Parser!

app.get('/', (req, res) => {
  res.send(db.database)
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})
// using closure
app.post('/register', register.handleRegister(db, bcrypt))
app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db)
})
app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`app is running on port ${PORT}`)
})
// RUN: PORT=5000 node server.js
