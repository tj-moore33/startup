const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');

const app = express();
const authCookieName = 'token';

let users = [];
let weatherData = {}; // Stores user preferences (city, state)

// Server Port
const port = process.argv.length > 2 ? process.argv[2] : 4000;

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public')); // Frontend files

// API Router
const apiRouter = express.Router();
app.use(`/api`, apiRouter);


// Register User
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'User already exists' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

// Login User
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user && (await bcrypt.compare(req.body.password, user.password))) {
    user.token = uuid.v4();
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  } else {
    res.status(401).send({ msg: 'Invalid login' });
  }
});

// Logout User
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    delete user.token;
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

// Middleware: Verify User Auth
const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};


// Update User's Weather Preference
apiRouter.post('/weather', verifyAuth, (req, res) => {
  const user = findUser('token', req.cookies[authCookieName]);
  if (user) {
    weatherData[user.email] = {
      city: req.body.city,
      state: req.body.state,
      weather: generateRandomWeather(),
    };
    res.send(weatherData[user.email]);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

// Get User's Weather Preference
apiRouter.get('/weather', verifyAuth, (req, res) => {
  const user = findUser('token', req.cookies[authCookieName]);
  if (user && weatherData[user.email]) {
    res.send(weatherData[user.email]);
  } else {
    res.status(404).send({ msg: 'No weather data found' });
  }
});

// Create User
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

// Find User
async function findUser(field, value) {
  return users.find((u) => u[field] === value);
}

// Set Auth Cookie
function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

// // Generate Random Weather Data
// function generateRandomWeather() {
//   const weatherTypes = ["Sunny", "Cloudy", "Rainy", "Snowy", "Stormy"];
//   return {
//     temperature: Math.floor(Math.random() * (100 - 30) + 30),
//     windSpeed: Math.floor(Math.random() * (25 - 1) + 1),
//     humidity: Math.floor(Math.random() * (100 - 20) + 20),
//     weatherType: weatherTypes[Math.floor(Math.random() * weatherTypes.length)],
//   };
// }

// Start Server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
