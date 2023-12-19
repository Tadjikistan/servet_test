import mongoose from "mongoose"

export const connectMongoDB = async() => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to database');
    } catch (error) {
        console.log('Something go wrong while connecting to database', error)
    }
}