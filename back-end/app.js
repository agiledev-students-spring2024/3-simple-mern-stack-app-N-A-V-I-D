require('dotenv').config({ silent: true }) // load environmental variables from a hidden file named .env
const express = require('express') // CommonJS import style!
const morgan = require('morgan') // middleware for nice logging of incoming HTTP requests
const cors = require('cors') // middleware for enabling CORS (Cross-Origin Resource Sharing) requests.
const mongoose = require('mongoose')

const app = express() // instantiate an Express object
app.use('/public', express.static('public')); // This line is important
app.use(morgan('dev', { skip: (req, res) => process.env.NODE_ENV === 'test' })) // log all incoming requests, except when in unit test mode.  morgan has a few logging default styles - dev is a nice concise color-coded style
app.use(cors()) // allow cross-origin resource sharing

// use express's builtin body-parser middleware to parse any data included in a request
app.use(express.json()) // decode JSON-formatted incoming POST data
app.use(express.urlencoded({ extended: true })) // decode url-encoded incoming POST data

// connect to database
mongoose
  .connect(`${process.env.DB_CONNECTION_STRING}`)
  .then(data => console.log(`Connected to MongoDB`))
  .catch(err => console.error(`Failed to connect to MongoDB: ${err}`))

// load the dataabase models we want to deal with
const { Message } = require('./models/Message')
const { User } = require('./models/User')


app.get('/aboutus', async (req, res) =>{
  try{
    const about_me = {
      html_about_me:"Hi. My name is Navid Chowdhury\nI am a senior Computer Science student at NYU with a minor in Web Applications. In my spare time I love to read, play videogames, ride my skateboard, and watch various crime shows. My favorites include Psych, Leverage, Tulsa King, and currently Snowfall. I typically play videogames on my PC (which was fun to build) but occasionally on other platforms too like my Switch. My favorite games include GTA V, Marvel's Spider-Man, Detroit Become Human, and occasionally Call of Duty. On the Switch I loved the Zelda games.\n\n I also love listening to music. My top artists include Pop Smoke, OneRepublic, Omah Ley, and Maroon 5. My favorite songs are The Monster by Eminem, More Than You Know by Axwell Ingrosso, and Hope by The Chainsmokers. Honorable mentions include Keep You Mine by NOTD and Banlieue by Neima Ezza. I listen to music while doing almost any task and as a result I had over 100,000 minutes worth of music listened to on Spotify this past year. This equates to about 70 days straight.\n\n\n",
      photo_of_me: "/public/asset/navidspicture.jpg"
      //back-end\public\asset\navidspicture.jpg
    }
    res.json(about_me)

  } catch(err) {
    res.status(400).json({
      error: err,
      status: 'failed to retrieve image from back-end',
    })
  }
})
// a route to handle fetching all messages
app.get('/messages', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({})
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})

// a route to handle fetching a single message by its id
app.get('/messages/:messageId', async (req, res) => {
  // load all messages from database
  try {
    const messages = await Message.find({ _id: req.params.messageId })
    res.json({
      messages: messages,
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    res.status(400).json({
      error: err,
      status: 'failed to retrieve messages from the database',
    })
  }
})
// a route to handle logging out users
app.post('/messages/save', async (req, res) => {
  // try to save the message to the database
  try {
    const message = await Message.create({
      name: req.body.name,
      message: req.body.message,
    })
    return res.json({
      message: message, // return the message we just saved
      status: 'all good',
    })
  } catch (err) {
    console.error(err)
    return res.status(400).json({
      error: err,
      status: 'failed to save the message to the database',
    })
  }
})

// export the express app we created to make it available to other modules
module.exports = app // CommonJS export style!
