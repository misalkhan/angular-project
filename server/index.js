const express = require('express')
const mongoose = require('mongoose')
const app = express()
const port = 3000
require('dotenv').config();
const userRouter = require('./routes/user-routes')
const postRouter = require('./routes/post-routes')
const cors = require('cors')
// Middleware for parsing JSON request bodies
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: 'http://localhost:4200',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization', 'token'],
    credentials: true
}));

mongoose.connect(process.env.MONGO_DB)
    .then(() => {
        console.log('Database connection successful');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

app.get('/'), (req, res) => {
    console.log('hello world')
    return res.status(200).send('succcessfully')
}

app.use('/user', userRouter)
app.use('/post', postRouter)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
}) 