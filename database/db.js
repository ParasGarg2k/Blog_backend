import mongoose from 'mongoose';

const Connection = async () => {
    const URL = process.env.MONGOURL;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;