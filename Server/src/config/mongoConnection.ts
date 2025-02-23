import mongoose from "mongoose";
import { config } from "./config";

const mongoConnection = async (): Promise<void> => {
    try {
        await mongoose.connect(config.mongoUrl);
        console.log("MongoDB Connected Successfully");
    } catch (error) {
        console.error("MongoDB Connection Error:", error);
        process.exit(1);
    }
}

export default mongoConnection;