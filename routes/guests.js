var express = require('express');
var router = express.Router();


var guest_controller = require('../controllers/guestController');

router.get('/', guest_controller.index);
router.get('/guests', guest_controller.guest_list);
router.get('/guest/create', guest_controller.guest_create_get);
router.post('/guest/create', guest_controller.guest_create_post);
router.get('/guest/:id', guest_controller.guest_detail);
router.post('/guest/:id', guest_controller.guest_update_post);
router.get('/guest/:id/delete', guest_controller.guest_delete_get);
router.post('/guest/:id/delete', guest_controller.guest_delete_post);
module.exports = router;
