const express = require('express');
const cors = require('cors');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const store = new MongoDBStore({
    uri: 'mongodb://localhost:27017/file-upload',
    collection: 'sessions',
    expires: 1000 * 60 * 60 * 2,
});

const middlewares = [
    cors(),
    express.urlencoded({ extended: true }),
    express.json(),
    session({
        secret: process.env.SECRET_KEY || 'secret_key',
        resave: false,
        store: store,
        saveUninitialized: false,
        cookie: {
            maxAge: 60 * 60 * 2 * 1000,
        },
    }),
];

module.exports = middlewares;
