require('dotenv').config();
const express = require('express');
const app = express();
const routes = require('./routes.js');
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use('/public', express.static(path.join(__dirname, '../public')));
app.use('/', routes);



const PORT = 1729;

app.listen(PORT, () => {
    console.log(`✅ Server listening at port ${PORT}`)
});