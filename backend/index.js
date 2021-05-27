const express = require('express');
const app = express();
const helmet = require('helmet');
const morgan = require('morgan');
const cors = require('cors');
const CookieParser = require('cookie-parser');
const path = require('path');

// environment variables
require('dotenv').config({
    path: './config/.env',
});

// connect DB
const { connectDB } = require('./config/db');

connectDB(process.env.DB_URL)
    .then(() => {
        console.log('connected to database');
    })
    .catch(error => {
        console.log(`can't connect database because ${error.message}`);
    });

app.use(
    cors({
        credentials: true,
        origin: process.env.CLIENT_URL,
        path: '/',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        exposedHeaders: ['authorization', 'Set-Cookie'],
    })
);

app.use(express.static(path.join(__dirname, 'public', 'temp')));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(CookieParser());

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}
app.use(helmet());

// api routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/cart', require('./routes/cartRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`backend is working on port ${PORT}`);
});
