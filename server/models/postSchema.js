const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false
    },
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    // likedBy: [{
    //     postLikedBy: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: true,
    //     },
    //     username: {
    //         type: String,
    //         required: true,
    //         default: null,
    //         minlength: 1,
    //         maxlength: 50
    //     }
    // }
    // ],
    // comments: [{
    //     comment: {
    //         type: String,
    //         required: true,
    //         default: null,
    //         minlength: 1,
    //         maxlength: 200
    //     },
    //     commentedBy: {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: 'User',
    //         required: true,
    //     }
    // }],
   createdOn: {
        type: Date,
        required: true,
        default: Date.now
    },
    updatedOn: {
        type: Date,
        required: false,
        default: Date.now
    },

 
})

const Post = mongoose.model('Post', postSchema);
module.exports = Post;