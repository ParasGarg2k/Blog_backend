import mongoose from 'mongoose';

const CommentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    postId: {
        type:mongoose.Schema.Types.ObjectId, 
        ref:"post", 
    },
    date: {
        type: Date,
        default:Date.now(),
        required: true
    },
    comments: {
        type: String,
        required: true
    }
});


const comment = mongoose.model('comment', CommentSchema);

export default comment;