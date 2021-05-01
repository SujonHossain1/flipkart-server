const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const path = require('path');
require('dotenv').config();
const setupRoutes = require('./routes/routes');
const middlewares = require('./middlewares/middlewares');

// App Config
const app = express();

if (app.get('env').toLowerCase() === 'development') {
    app.use(morgan('dev'));
}

//middlewares
app.use(middlewares);
setupRoutes(app);
app.use('/public', express.static(path.join(__dirname, 'uploads')));

app.get('/', (req, res) => {
    res.send({ message: 'Hello World' });
});

app.use('*', (req, res) => {
    res.status(404).send({
        message: '404 Not Found',
    });
});

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next('There is Error from headersSend');
    } else if (err.message) {
        res.status(err.status || 500).send({
            success: false,
            TypeError: err.message,
        });
    } else {
        res.status(500).send({
            success: false,
            error: 'There was an error',
        });
    }
});

const PORT = process.env.PORT || 4000;
const environment = app.get('env');

// Server Configuration && Database Connection
app.listen(PORT, () => {
    console.log(
        `SERVER IS RUNNING ON PORT ${PORT} AND SERVER ON MODE ${environment}`
    );
    if (process.env.NODE_ENV === 'production') {
        console.log('Connected to MongoDB Live  Database');
    } else {
        mongoose
            .connect('mongodb://localhost:27017/file-upload', {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true,
            })
            .then(() => {
                console.log('Connected to MongoDB Local Database');
            })
            .catch((err) => console.log(err));
    }
});
