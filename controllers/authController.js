'use strict';

exports.respondLogin = (req, res) => {
  res.render('login');
};

exports.respondRegister = (req, res) => {
  res.render('register');
};
