var Guest = require('../models/guest');
var async = require('async');

exports.index = function(req, res) {
  res.render('index', {});
};

exports.guest_list = function(req, res, next) {
  Guest.find()
    .exec(function(err, list_guests) {
      if (err) {
        return next(err);
      }
      res.render('guest_list', {
        list_guests: list_guests
      });

    });
};
exports.guest_create_get = function(req, res, next) {
  res.render('guest_create', {});
};
exports.guest_create_post = function(req, res, next) {
  req.checkBody('fullname', 'Fullname cannot be empty').notEmpty();
  req.checkBody('email', 'Email field cannot be empty').notEmpty();
  req.checkBody('comment', 'Comment section cannot be empty').notEmpty();

  var errors = req.validationErrors();

  var newGuest = new Guest({
    fullname: req.body.fullname,
    email: req.body.email,
    comment: req.body.comment
  });
  //console.log('new guest created:' + newGuest);


  if (errors) {

    res.render('guest_create', {
      errors: errors
    });
    return;
  } else {
    newGuest.save(function(err) {
      if (err) {
        return next(err);
      }
      res.render('guest_create', {
        success: 'Successfully Added'
      });
    });
  }
};
//this guest_detail is also used as the guest_update_get.
exports.guest_detail = function(req, res, next) {
  async.parallel({
    guest: function(callback) {
      Guest.findById(req.params.id).exec(callback)
    },
  }, function(err, results) {
    if (err) {
      return next(err);
    }
    res.render('guest_detail', {
      guest: results.guest,
      //success: 'Edit Successfull'
    });

  });
};
exports.guest_update_post = function(req, res, next) {
  req.checkBody('fullname', 'Fullname cannot be empty').notEmpty();
  req.checkBody('email', 'Email field cannot be empty').notEmpty();
  req.checkBody('comment', 'Comment section cannot be empty').notEmpty();

  var updGuest = new Guest({
    fullname: req.body.fullname,
    email: req.body.email,
    comment: req.body.comment,
    _id: req.params.id
  });

  var errors = req.validationErrors();
  if (errors) {
    res.render('guest_detail', {
      errors: errors,
      guest: updGuest,
    });
    return;

  } else {
    Guest.findByIdAndUpdate(req.params.id, updGuest, {}, function(err, theGuest) {
      if (err) {
        return next(err);
      }

      res.redirect('/user/guests');
    });
  }
};
exports.guest_delete_get = function(req, res, next) {
  async.parallel({
    guest: function(callback) {
      Guest.findById(req.params.id).exec(callback)
    },
  }, function(err, results) {
    if (err) {
      return next(err);
    }
    res.render('guest_delete', {
      guest: results.guest
    });
  });
};
exports.guest_delete_post = function(req, res, next) {
  Guest.findByIdAndRemove(req.body.id, function deleteGuest(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/user/guests');
  });
};
