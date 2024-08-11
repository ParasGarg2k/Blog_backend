import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: 
    { type: Date,
      default: Date.now 
    },

});

// we dont need User because blogs will be posted from our side only 

const user = mongoose.model('user', userSchema);

export default user;