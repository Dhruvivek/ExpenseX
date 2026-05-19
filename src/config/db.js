import mongoose from 'mongoose'

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.URL);
        console.log("Mongodb is connected");
    }
    catch(error){
        console.error('Mongoose connection error:',error);
        process.exit(1);
    }
};

export default connectDB