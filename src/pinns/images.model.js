const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imageSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        link: {
            type: String,
            required: true,
        },
        description: String,
        userId: {
            type: String,
            required: true,
        },
        __v: {type: Number, select: false}
    },
    {
        timestamps: true, versionKey: false
    }
);

module.exports = mongoose.model('Image', imageSchema, 'images');