const express = require('express');
const app = express();


// Archivos de rutas

// Middlewares

app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// app.use('/api', ) // Aqui va el archivo de rutas;


module.exports = app;