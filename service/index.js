require('dotenv').config({ path: './weather.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
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
app.use(express.static('public')); // Serve frontend files

// Create API Router and mount it before defining any routes
const apiRouter = express.Router();
app.use('/api', apiRouter);

// Test Route
apiRouter.get('/', (req, res) => {
  res.send({ msg: 'API is working!' });
});

// Define other API routes after apiRouter is defined
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    res.status(409).send({ msg: 'User already exists' });
  } else {
    const user = await createUser(req.body.email, req.body.password);
    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

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

apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) delete user.token;
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

apiRouter.post('/weather', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    const weather = await fetchWeather(req.body.city);
    if (!weather) {
      return res.status(500).send({ msg: 'Failed to fetch weather data' });
    }
    weatherData[user.email] = {
      city: req.body.city,
      state: req.body.state,
      weather,
    };
    res.send(weatherData[user.email]);
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
});

apiRouter.get('/weather', verifyAuth, async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user && weatherData[user.email]) {
    res.send(weatherData[user.email]);
  } else {
    res.status(404).send({ msg: 'No weather data found' });
  }
});

// Helper Functions
async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);
  const user = { email, password: passwordHash, token: uuid.v4() };
  users.push(user);
  return user;
}

async function findUser(field, value) {
  return users.find((u) => u[field] === value);
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict',
  });
}

async function fetchWeather(city) {
  const apiKey = process.env.API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching weather data:', error.message);
    return null;
  }
}

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});