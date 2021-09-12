const express = require('express'),
  router = express.Router(),
  authController = require('../controllers/authController');
const { check, validationResult } = require('express-validator');

router.get('/login', authController.respondLogin);
router.get('/register', authController.respondRegister);

router.post('/login', (req, res) => {
  console.log(req.body);
  console.log(req.query);
  res.send('POST Successful!');
});
router.post(
  '/register',
  [
    // checkメソッドを使用してバリデーションを実行
    // withMessageメソッドで弾かれた場合のmsgを設定

    check('name').not().isEmpty().withMessage('nameEmpty'),
    check('email').not().isEmpty().withMessage('emailEmpty'),
    check('password').not().isEmpty().withMessage('passwordEmpty'),
    check('password').isLength({ min: 7 }).withMessage('passwordUnder7'),
    //バリデーションをカスタムで作成
    check('password')
      .custom((value, { req }) => {
        //一致した場合trueを返す
        if (req.body.password === req.body.confirmPassword) {
          return true;
        }
      })
      .withMessage('passwordNoMach'),
  ],
  // (req, res) => {
  //   console.log(req.body);
  //   console.log(req.query);
  //   res.send('POST Successful!');
  // }
  function (req, res, next) {
    const errors = validationResult(req);
    //エラーオブジェクトをerrorsに格納。
    if (!errors.isEmpty()) {
      let messages = [];
      errors.errors.forEach((error) => {
        messages.push(error.msg);
        //配列に格納
      });
      res.render('register', { messages: messages });
    } else {
      req.session.name = req.body.name;
      //セッションに格納
      res.redirect('/home');
    }
  }
);

module.exports = router;
