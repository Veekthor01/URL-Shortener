const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
const sql = require('./DB/db');
const urlRoute = require('./Routes/urlRoute');
const redirectRoute = require('./Routes/redirectRoute');
const customRoute = require('./Routes/customRoute');

const PORT = process.env.PORT || 5000;

const corsOptions = {
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Use your database connection in routes and controllers
app.use((req, res, next) => {
  req.sql = sql;// Make the database connection available in the request object
  next();
});

app.get('/', (req, res) => {
  res.send('Hey this is my API running 🥳')
})

app.use('/url', urlRoute);
app.use('/', redirectRoute);
app.use('/', customRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});