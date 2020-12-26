const express = require('express');
const router = express.Router();

const UserController = require('../controllers/User');
const User = require('../models/User');


//Tenemos que importar los controladores o la logica para poder
// Juntarla con las rutas, dependiendo de las rutas, ejeecutas un controllador


// Empezamos las rutas del usuario;


router.get('/test', UserController.test);
router.get('/users', UserController.getUsers);
router.get('/user/:id?', UserController.getUser);

router.post('/register', UserController.createUser);
router.post('/login', UserController.login);

module.exports = router;