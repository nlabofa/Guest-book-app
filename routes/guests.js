var express = require('express');
var router = express.Router();
var passport = require('passport');


var guest_controller = require('../controllers/guestController');


router.get('/signup', function(req, res) {
    res.render('signup', { message: req.flash('signupMessage') });
});
router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/user/profile', // redirect to the secure profile section
    failureRedirect: '/user/signup', // redirect back to the signup page if there is an error
    failureFlash: true // allow flash messages
}));
router.get('/login', function(req, res, next) {
    res.render('login', { message: req.flash('loginMessage') });
});
router.post('/login', passport.authenticate('local-login', {
    successRedirect: '/user/profile',
    failureRedirect: '/user/login',
    failureFlash: true,
}));
router.get('/profile', isLoggedIn, function(req, res) {
    res.render('profile', { user: req.user });
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});
router.get('/', guest_controller.index);
router.get('/guests', guest_controller.guest_list);
router.get('/guest/create', guest_controller.guest_create_get);
router.post('/guest/create', guest_controller.guest_create_post);
router.get('/guest/:id', guest_controller.guest_detail);
router.post('/guest/:id', guest_controller.guest_update_post);
router.get('/guest/:id/delete', guest_controller.guest_delete_get);
router.post('/guest/:id/delete', guest_controller.guest_delete_post);
module.exports = router;


function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}