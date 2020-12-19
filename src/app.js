const express = require('express');
const app = express();


// Archivos de rutas

const  user_routes = require('./routes/user');

// Middlewares

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

app.use('/api', user_routes) // Aqui va el archivo de rutas;


module.exports = app;