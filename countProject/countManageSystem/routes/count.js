/**
 * Created by jhp-android on 15/8/8.
 */

var express = require('express');
var router = express.Router();

router.get('/', checkLogin);
router.get('/', function (req, res) {

    res.render('count', {
        title: '数据总览',
        admin: req.session.admin,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.get('/user', checkLogin);
router.get('/user', function (req, res) {

    res.render('countUser', {
        title: '用户端数据',
        admin: req.session.admin,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.get('/designer', checkLogin);
router.get('/designer', function (req, res) {

    res.render('countDesigner', {
        title: '搭配师端数据',
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