var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var GuestSchema = Schema({
    fullname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
});

GuestSchema.virtual('url').get(function() {
    return '/user/guest/' + this._id;
});
module.exports = mongoose.model('Guest', GuestSchema);