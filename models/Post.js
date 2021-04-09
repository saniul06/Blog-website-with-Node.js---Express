const { Schema, model } = require('mongoose');

const User = require('../models/User')

const Comment = require('../models/Comment')

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        maxlength: 100
    },
    body: {
        type: String,
        required: true,
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    tags: [
        {
            type: [String],
            required: true
        }
    ],
    thumbnail: String,
    readTime: String,
    likes: [
        {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        }
    ],
    dislikes: [
        {
            type: [Schema.Types.ObjectId],
            ref: 'User'
        }
    ],
    comments: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Comment'
        }
    ]
}, {
    timestamp: true
})

const Post = model('post', postSchema);
module.exports = Post;