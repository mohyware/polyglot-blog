const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: [true, 'Please provide Title'],
            maxlength: 50,
        },
        body: {
            type: String,
            required: [true, 'Please provide Body'],
        },
        metaDescription: {
            type: String,
            required: [false, 'Please provide Meta Description'],
            maxlength: 300,
        },
        createdBy: {
            type: String,
            required: [false, 'Please provide user'],
            maxlength: 10,
        },
        tags: {
            type: [String],
            required: [false, 'Please provide tags'],
            validate: {
                validator: function (value) {
                    return Array.isArray(value) && value.every(item => typeof item === 'string');
                },
                message: 'Tags must be an array of strings'
            }
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Post', PostSchema);