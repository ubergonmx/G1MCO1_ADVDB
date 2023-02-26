const express = require('express');
const app = express();

const controller = require('../controllers/controller.js');
app.set('view engine', 'ejs');
app.get('/', controller.getHome);
app.get('/table1', controller.getTable1);
app.get('/table2', controller.getTable2);
app.get('/table3', controller.getTable3);
app.get('/table4', controller.getTable4);

module.exports = app;