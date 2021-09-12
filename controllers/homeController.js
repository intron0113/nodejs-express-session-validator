'use strict';

exports.goHome = (req, res) => {
  let name = 'ログイン名がはいります';
  if (req.session.name != undefined) {
    name = req.session.name;
  }
  res.render('home', {
    name: name,
  });
};
