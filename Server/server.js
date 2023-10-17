const express = require('express');
const app = express();
const morgan = require('morgan');
const urlShortenRoute = require('./urlShortenRoute');
const urlCustomRoute = require('./urlCustomRoute');
const urlRedirectRoute = require('./urlRedirectRoute');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/shorten', urlShortenRoute);
app.use('/custom', urlCustomRoute);
app.use('/redirect', urlRedirectRoute);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send({ error: err.message });
  });

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});