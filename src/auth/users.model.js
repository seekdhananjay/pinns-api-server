const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    userId: {
        type: String,
        required: true,
    },
    userName: {
        type: String,
        required: true,
    },
    userLoginProvider: {
        type: String,
        required: true,
    },
    userDisplayName: {
        type: String,
        required: true,
    },
    userProfileUrl: {
        type: String
    },
    userProfileImageUrl: {
        type: String,
    },
    userLocation: {
        type: String,
    },
    userCompany: {
        type: String,
    },
}, {timestamps: true, versionKey: false});
UserSchema.statics.findByUserId = function(userId) {
    return this.findOne({ userId });
};

module.exports = mongoose.model('User', UserSchema, 'users')
