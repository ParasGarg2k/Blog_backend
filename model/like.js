const mongoose = require('mongoose')

const likeSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    postId: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"post", 
        required:true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId, 
        ref:"user", 
        required:true
    },
    date: {
        type: Date,
        default:Date.now(),
        required: true
    }

})

module.exports = mongoose.model('like',likeSchema)