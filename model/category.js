import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    postId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"post", 
    }
});


const category = mongoose.model('category', CategorySchema);

export default category;