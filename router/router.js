const User = require('../models/user')

module.exports = (app) => {
  app.use( (req, res, next) => {
    const _user = req.session.user
    app.locals.user = _user
    next()
  })

  // 注册
  app.post('/api/user/signup',  (req, res) => {
    const _user = req.body
    console.log(_user + 'singinsinginsinginsinginsinginsinginsinginsinginsingin')
    User.findOne({username: _user.username},  (err, user) => {
      if (err) {
        global.logger.error(err)
      }
      if (user) {
        res.json({
          errno: 1,
          data: '用户名已存在'
        })
      } else {
        user = new User(_user)
        user.save( (err, user) => {
          if (err) {
            global.logger.error(err)
          }
          res.json({
            errno: 0,
            data: '注册成功'
          })
        })
      }
    })
  }),
  // 登录
  app.post('/api/user/signin', (req, res) => {
    const _user = req.body
    const username = _user.username
    const password = _user.password
    User.findOne({username: username}, (err, user) => {
      if (err) {
        global.logger.error(err);
      }
      if (!user) {
        res.json({
          errno: 1,
          data: '用户不存在'
        })
      } else {
        if (!!password) {
          user.comparePassword(password, (err, isMatch) => {
            if (err) {
              global.logger.error(err);
            }
            if (isMatch) {
              req.session.user = user;
              global.logger.info('success');
              res.json({
                errno: 0,
                data: '登录成功',
                name: name,
                src: user.src
              })
            } else {
              res.json({
                errno: 1,
                data: '密码不正确'
              })
              global.logger.info('password is not meached');
            }
          })
        } else {
          res.json({
            errno: 1,
            data: '登录失败'
          })
        }
      }

    })
  })
}
