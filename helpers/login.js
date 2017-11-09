module.exports = function checkLogin(req, res, next){

  if (!req.session.login) {
    console.log('ooooooo');
      res.redirect('/index/signin')
  }
    next()
}
