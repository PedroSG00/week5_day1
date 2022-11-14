const express = require('express');
const router = express.Router();

const User = require('./../models/User.model')

const bcryptjs = require('bcryptjs');
const saltRounds = 10

const { isLoggedOut } = require('../middleware/route-guard');


// Signup form (render)
router.get('/registro', isLoggedOut, (req, res) => {
  res.render('auth/signup')
})


// Signup form (handle)
router.post('/registro', isLoggedOut, (req, res) => {

  const { email, username, plainPassword } = req.body

  bcryptjs
    .genSalt(saltRounds)
    .then(salt => {
      return bcryptjs.hash(plainPassword, salt)
    })
    .then(hashedPassword => {
      return User.create({ username, email, password: hashedPassword })
    })
    .then(() => res.redirect('/inicio-sesion'))
    .catch(err => console.log('LOS CATCH ESTAN PARA ALGO, YA HABLAREMOS', err))
})





// Login form (render)
router.get('/inicio-sesion', isLoggedOut, (req, res) => {
  res.render('auth/login')
})


// Login form (handle)
router.post('/inicio-sesion', isLoggedOut, (req, res) => {

  const { email, username, plainPassword } = req.body

  User
    .findOne({ email })
    .then(user => {

      if (!user) {
        res.render('auth/login', { errorMessage: 'Email no reconocido' })
        return
      }

      if (bcryptjs.compareSync(plainPassword, user.password) === false) {
        res.render('auth/login', { errorMessage: 'Contraseña incorrecta' })
        return
      }
      req.session.currentUser = user      // login
      res.redirect('/mi-perfil')
    })
    .catch(err => console.log(err))
})


router.get('/cierre-sesion', (req, res) => {
  req.session.destroy(() => res.redirect('/inicio-sesion'))
})


module.exports = router