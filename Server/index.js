const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const path = require('path');
const app = express();
const morgan = require('morgan');
const dotenv = require('dotenv');
const qs = require('qs');
const JWT_SECRET = process.env.JWT_SECRET;
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const session = require('express-session');
const bcrypt = require('bcrypt');

dotenv.config();
// Set up middleware for parsing JSON and handling file uploads
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use(
  cookieSession({
    maxAge: 24 * 60 * 60 * 1000, // One day in milliseconds
    name: 'session',
    keys: ['initialKey'],
  })
);

//authenticate with Google
// const {
//   authenticateToken,
//   isAdmin,
//   generateToken,
//   isLoggedIn,
// } = require('./middleware/authMiddleware');

const config = {
  clientId: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  authUrl: 'https://accounts.google.com/o/oauth2/v2/auth',
  tokenUrl: 'https://oauth2.googleapis.com/token',
  redirectUrl: process.env.REDIRECT_URL,
  clientUrl: process.env.CLIENT_URL,
  tokenSecret: process.env.TOKEN_SECRET,
  tokenExpiration: 36000,
  // postUrl: 'https://jsonplaceholder.typicode.com/posts'
};

/**
 * Authorization parameters
 * Link: https://developers.google.com/identity/protocols/oauth2/web-server#creatingclient
 */
const authParams = qs.stringify({
  client_id: config.clientId,
  redirect_uri: config.redirectUrl,
  response_type: 'code',
  scope: 'openid profile email',
  access_type: 'offline',
  state: 'standard_oauth',
  prompt: 'consent',
});

/**
 * Returns the parameters that is used with the token URL
 * Link: https://developers.google.com/identity/protocols/oauth2/web-server#exchange-authorization-code
 * @param {string} code Authorization code
 * @returns {object} Token url parameters
 */
const getTokenParams = (code) =>
  queryString.stringify({
    client_id: config.clientId,
    client_secret: config.clientSecret,
    code,
    grant_type: 'authorization_code',
    redirect_uri: config.redirectUrl,
  });

//Models
const CollectedItem = require('./models/CollectedItem');
const FoundItem = require('./models/FoundItem');
const LostItem = require('./models/LostItem');
const User = require('./models/User');

//Routes
const userRoute = require('./routes/userRoutes');
// const authRoute = require('./routes/authRoutes');
const foundItemRoute = require('./routes/foundRoutes');
const lostItemRoute = require('./routes/lostRoutes');
const collectedItemRoute = require('./routes/collectedRoutes');
const adminUserRoute = require('./routes/adminUserRoutes');
const adminFoundRoute = require('./routes/adminFoundRoutes');
const adminLostRoute = require('./routes/adminLostRoutes');
const adminCollectedRoute = require('./routes/adminCollectedRoutes');

//Set up MongoDB connection
const MONGODB_URI =
  'mongodb+srv://manasramesh24:xf3Yq8PfBJr3BG8b@trinityretrieve.tnckcq7.mongodb.net/?retryWrites=true&w=majority'; // Replace with your MongoDB connection string
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Set up multer storage configuration for found items
const foundItemStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './foundItemImages');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extname = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + extname);
  },
});

// Set up multer upload configuration for found items
const foundItemUpload = multer({ storage: foundItemStorage });

// Set up express session
app.use(
  session({
    secret: process.env.TOKEN_SECRET, // Replace with your own secret key
    resave: false,
    saveUninitialized: true,
  })
);

app.use(
  cors({
    origin: [config.clientUrl],
    methods: 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.use(cookieParser());

//basic route
// app.get('/', (req, res) => {
//   // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
//   // return res.status(200).json({ message: 'You are not logged in' });
// });

app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Protected route example: User profile
app.get('/profile', (req, res) => {
  if (!req.user) {
    res.redirect('/auth/google');
  } else {
    res.send(`Welcome, ${req.user.displayName}!`);
  }
});

//
// app.use('/auth', authRoute);
app.use('/users', userRoute);
app.use('/feedback', require('./routes/feedback'));
app.use('/found', foundItemRoute);
app.use('/lost', lostItemRoute);
app.use('/collected', collectedItemRoute);
app.use('/admin/users', adminUserRoute);
app.use('/admin/found', adminFoundRoute);
app.use('/admin/lost', adminLostRoute);
app.use('/admin/collected', adminCollectedRoute);

// for fetching the images
app.use(
  '/foundItemImages',
  express.static(path.join(__dirname, 'foundItemImages'))
);
app.use(
  '/lostItemImages',
  express.static(path.join(__dirname, 'lostItemImages'))
);

// Error handling middleware for unrecognized routes
app.use((req, res, next) => {
  res.status(404).send("Sorry, can't find that!");
});

// Start the server
const port = process.env.PORT || 3010; // Choose the desired port for your server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
