import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
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
    },
    comment: {
        type: String,
        required: true
    }
});


const comment = mongoose.model('comment', CommentSchema);

export default comment;