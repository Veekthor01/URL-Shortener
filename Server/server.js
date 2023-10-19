const express = require('express');
const app = express();
const morgan = require('morgan');
const urlRoute = require('./Routes/urlRoute');
const redirectRoute = require('./Routes/redirectRoute');
const customRoute = require('./Routes/customRoute');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/url', urlRoute);
app.use('/', redirectRoute);
app.use('/', customRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on PORT ${PORT}`);
});