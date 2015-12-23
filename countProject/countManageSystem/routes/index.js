var express = require('express');
var router = express.Router();

router.get('/',checkLogin);
router.get('/', function(req, res, next) {
    res.render('index',{
        title: '首页',
        admin: req.session.admin,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

function checkLogin(req, res, next) {
    if (!req.session.admin) {
        res.redirect('/admin/login');
    }
    next();
}

module.exports = router;