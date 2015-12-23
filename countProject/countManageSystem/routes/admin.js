var express = require('express'),
    crypto = require('crypto');
var router = express.Router();
var Admin = require('../model/admin.js');

router.get('/login', checkNotLogin);
router.get('/login', function (req, res) {
    res.render('login', {
        title: '',
        admin: req.session.admin,
        success: req.flash('success').toString(),
        error: req.flash('error').toString()
    });
});

router.post('/login',checkNotLogin);
router.post('/login', function(req, res, next) {
    var md5 = crypto.createHash('md5'),
        password = md5.update(req.body.password).digest('hex');
    Admin.get(req.body.email, function (err, admin) {
        if (!admin) {
            req.flash('error', '用户不存在!');
//            //生成密码的 md5 值
//            var md5 = crypto.createHash('md5'),
//                password = md5.update(req.body.password).digest('hex');
//            var newAdmin = new Admin({
//                email: req.body.email,
//                password: password
//            });
//            Admin.get(newAdmin.email, function (err, admin) {
//                if (admin) {
//                    req.flash('error', '用户已存在!');
//                    return res.redirect('/admin/login');//返回注册页
//                }
//                newAdmin.save(function (err, admin) {
//                    if (err) {
//                        req.flash('error', err);
//                        return res.redirect('/admin/login');
//                    }
//                    req.session.admin = admin;
//                    req.flash('success', '注册成功!');
//                    res.redirect('/');
//                });
//            });
            return res.redirect('/admin/login');
        }
        if (admin.password != password) {
            req.flash('error', '密码错误!');
            return res.redirect('/admin/login');
        }
        req.session.admin = admin;
        res.redirect('/');
    });
});

router.get('/logout', checkLogin);
router.get('/logout', function (req, res) {
    req.session.admin = null;
    res.redirect('/admin/login');//登出成功后跳转到主页
});

function checkLogin(req, res, next) {
    if (!req.session.admin) {
        res.redirect('/admin/login');
    }
    next();
}

function checkNotLogin(req, res, next) {
    if (req.session.admin) {
        res.redirect('back');//返回之前的页面
    }
    next();
}

module.exports = router;