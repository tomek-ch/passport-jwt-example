require('dotenv').config();
const express = require('express');
const { urlencoded, json } = require('body-parser');
const mongoose = require('mongoose');
require('./passport');

const app = express();
app.use(json());
app.use(urlencoded({ extended: true }));

const mongoDb = process.env.DB_KEY;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Mongo connection error'));

const logIn = require('./routes/logIn');
const user = require('./routes/user');

app.post('/log-in', logIn);
app.post('/user', user);

app.use((err, req, res, next) => {
    console.log(err);
    res.sendStatus(500);
});

app.use((req, res, next) => res.sendStatus(404));

const port = process.env.PORT || 2137;
app.listen(port, () => console.log(`Listening on port ${port}`));