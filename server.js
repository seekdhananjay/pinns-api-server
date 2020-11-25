require('dotenv').config()
const express = require('express')
const path = require('path')
const fs = require('fs')
const https = require('https')
const http = require('http')
const passport = require('passport')
const session = require('express-session')
const cors = require('cors')
const socketio = require('socket.io')
const mongoose = require('mongoose')

const bodyParser = require('body-parser');  

const authRouter = require('./src/auth/auth.router')
const pinterestRouter = require('./src/pinns/pinterest.router')
const passportInit = require('./src/auth/passport.init')
const { CLIENT_ORIGIN } = require('./src/config/index')
const app = express()
let server

if (process.env.NODE_ENV === 'production') {
  server = http.createServer(app)
} else {
  const certOptions = {
    key: fs.readFileSync(path.resolve('certs/server.key')),
    cert: fs.readFileSync(path.resolve('certs/server.crt'))
  }
  server = https.createServer(certOptions, app)
}

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json())
app.use(passport.initialize())
passportInit()

app.use(cors({
  origin: CLIENT_ORIGIN
})) 
app.disable('x-powered-by');

app.use(session({ 
  secret: process.env.SESSION_SECRET, 
  resave: true, 
  saveUninitialized: true
}))

const mongoUserName = process.env.MONGODB_PIN_USERNAME;
const mongoUserPwd = process.env.MONGODB_PIN_PASSWORD;
const mongoDatabaseName = process.env.MONGODB_PIN_DATABASE;
const mongoHost = process.env.MONGODB_HOST;
const mongoPort = process.env.MONGODB_PORT;

const mongooseConnectOptions = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
};

const mongoUrl = `mongodb://${mongoUserName}:${mongoUserPwd}@${mongoHost}:${mongoPort}/${mongoDatabaseName}`;
mongoose.connect(mongoUrl, mongooseConnectOptions);

const io = socketio(server, {
  cors: {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["API_CREATOR"],
    credentials: true
  }
})

app.set('io', io)

// Catch a start up request so that an client can know that server is available or not
app.get('/wake-up', (req, res) => res.send('👍'))

app.use('/pin', pinterestRouter);

// Direct other requests to the auth router
app.use('/', authRouter)

server.listen(process.env.PORT || 8080, () => {
  console.log('Pinns API Server is running & listening...')
})
