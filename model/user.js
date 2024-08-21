import mongoose from 'mongoose';
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        lowercase:true,
        required: true
    },
    username: {
        type: String,
        required: true,
        lowercase:true,
    },
    role:{   
        type:String,
        default:"client",
        enum:['admin','client'],
    },
    image:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        lowercase:true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: 
    { type: Date,
      default: Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    post:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "post"
    }]
});

const user = mongoose.model('user', userSchema);

export default user;