require('dotenv').config();
const express = require('express')
const path = require('path');
const app = express()
const ejs = require('ejs')
const port = process.env.PORT || 3000;
const routes = require('./routes/routes.js');

const db = require('./database');

const server = app.listen(port, () => {
    console.log(`Server Started on port ${port}`)
})

app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs');
app.get('/', routes);
app.get('/table1', routes);
app.get('/table2', routes);
app.get('/table3', routes);
app.get('/table4', routes);