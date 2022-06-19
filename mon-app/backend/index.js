const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const login = require('./api/login');
const register = require('./api/register');
const index = require('./api/index');
const userRoutes = require('./api/routes/userRoutes');

const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true ,  parameterLimit: 100000 }));


app.use('/', userRoutes);

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.log(err.message);
});

const server = app.listen(process.env.PORT || 5000, () => {
    console.log('Server is running : ' + process.env.PORT);
})
