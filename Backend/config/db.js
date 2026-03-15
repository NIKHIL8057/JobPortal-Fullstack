import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_DB);
        console.log(`Mongo DB is connected ${conn}`);
    } catch (error) {
        console.log("Mongo DB error", error);

    }
}

export { connectDB }