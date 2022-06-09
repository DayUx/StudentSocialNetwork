const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const login = require('./api/login');
const register = require('./api/register');
const index = require('./api/index');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

app.use('/login', login);
//app.use('/register', register);
app.use('/', index);

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running : ' + process.env.PORT);
})
