const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

const router = require('./router');

const app = express();

mongoose.connect('mongodb://localhost/auth', { useNewUrlParser: true });

app.use(morgan('combined'));
app.use(bodyParser.json({ type: '*/*' }));
router(app);

const PORT = process.env.port || 3090;
const server = http.createServer(app);

server.listen(PORT);
console.log(`Server listening on: ${PORT}`);
