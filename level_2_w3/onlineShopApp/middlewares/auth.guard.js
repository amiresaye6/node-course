const isAuth =(req, res, next) => {
    if(req.session.userId) next()
    else res.redirect('/auth/login')
}

const isAdmin =(req, res, next) => {
    if(req.session.isAdmin) next()
    else res.redirect('/')
}

module.exports = {
    isAuth,
    isAdmin
}
